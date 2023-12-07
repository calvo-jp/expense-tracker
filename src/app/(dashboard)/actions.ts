"use server";

import {prisma} from "@/config/prisma";
import bcrypt from "bcrypt";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";
import {ChangePasswordSchema, UpdateProfileSchema} from "./schema";

export async function logout() {
	cookies().delete("user");
}

export async function updateProfile(input: unknown) {
	const id = cookies().get("user")?.value;

	if (!id) return "Auth required";

	const parsed = UpdateProfileSchema.safeParse(input);

	if (!parsed.success) return parsed.error.errors[0].message;

	const {data} = parsed;
	const {email} = data;

	/* duplicate email */
	if (email && (await prisma.user.exists({email, AND: {NOT: {id}}}))) {
		return "Email already in use";
	}

	try {
		await prisma.user.update({where: {id}, data});
		revalidatePath("/(dashboard)", "layout");
		return null;
	} catch {
		return "Something went wrong";
	}
}

export async function changePassword(input: unknown) {
	const id = cookies().get("user")?.value;

	if (!id) return "Auth required";

	const parsed = ChangePasswordSchema.safeParse(input);

	if (!parsed.success) return parsed.error.errors[0].message;

	try {
		const user = await prisma.user.findUniqueOrThrow({where: {id}});

		const matches = await bcrypt.compare(
			parsed.data.oldPassword,
			user.password,
		);

		if (!matches) return "Old password is incorrect";

		await prisma.user.update({
			where: {id},
			data: {
				password: await bcrypt.hash(
					parsed.data.newPassword,
					await bcrypt.genSalt(16),
				),
			},
		});

		return null;
	} catch {
		return "Something went wrong";
	}
}
