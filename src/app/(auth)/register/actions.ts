import {prisma} from "@/config/prisma";
import bcrypt from "bcrypt";
import {addDays} from "date-fns";
import {cookies} from "next/headers";
import {CreateAccountSchema} from "./schema";

export async function createAccount(input: unknown) {
	const parsed = CreateAccountSchema.safeParse(input);

	if (!parsed.success) return parsed.error.errors[0].message;

	const {data} = parsed;
	const {email} = data;

	/* duplicate email */
	if ((await prisma.user.count({where: {email}})) > 0) {
		return "Email already in use";
	}

	data.password = await bcrypt.hash(data.password, await bcrypt.genSalt(16));

	try {
		const user = await prisma.user.create({
			data,
			select: {
				id: true,
			},
		});

		cookies().set("user", user.id, {expires: addDays(new Date(), 30)});
		return null;
	} catch {
		return "Something went wrong";
	}
}
