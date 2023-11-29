"use server";

import {prisma} from "@/config/prisma";
import {WebServiceClient} from "@maxmind/geoip2-node";
import assert from "assert";
import bcrypt from "bcrypt";
import {addDays} from "date-fns";
import {revalidatePath} from "next/cache";
import {cookies, headers} from "next/headers";
import {redirect} from "next/navigation";
import {z} from "zod";
import {
	ChangePasswordSchema,
	CreateAccountSchema,
	LoginSchema,
	UpdateProfileSchema,
	UpsertExpenseSchema,
} from "./types";

assert(process.env.MAXMIND_ACCOUNT_ID);
assert(process.env.MAXMIND_LICENSE_KEY);

const maxmindAccountId = process.env.MAXMIND_ACCOUNT_ID;
const maxmindLicenceKey = process.env.MAXMIND_LICENSE_KEY;

/*
 *------------------- AUTH -------------------
 */

export async function login(input: unknown) {
	const parsed = LoginSchema.safeParse(input);

	if (!parsed.success) return parsed.error.errors[0].message;

	const {username, password} = parsed.data;

	try {
		const user = await prisma.user.findUniqueOrThrow({where: {username}});
		const matches = await bcrypt.compare(password, user.password);

		if (!matches) throw new Error();

		await recordLogin(user.id);

		cookies().set("user", user.id, {expires: addDays(new Date(), 30)});
		return null;
	} catch (e) {
		console.log(e);

		return "Invalid username or password";
	}
}

async function recordLogin(userId: string) {
	try {
		const details = await locate();
		const location = [details?.city?.names.en, details?.country?.names.en]
			.filter(Boolean)
			.join(", ");

		await prisma.activity.create({
			data: {
				type: "Login",
				userId,
				location,
			},
		});
	} catch {
		console.info("Failed to record login details");
	}
}

async function locate() {
	try {
		const client = new WebServiceClient(
			//
			maxmindAccountId,
			maxmindLicenceKey,
			{
				host: "geolite.info",
			},
		);

		const ipAddress = z.string().ip().parse(headers().get("x-forwarded-for"));

		return await client.city(ipAddress);
	} catch {
		return null;
	}
}

export async function logout() {
	cookies().delete("user");
	redirect("/");
}

/*
 *------------------- PROFILE -------------------
 */

export async function updateProfile(input: unknown) {
	const id = cookies().get("user")?.value;

	if (!id) return "Auth required";

	const parsed = UpdateProfileSchema.safeParse(input);

	if (!parsed.success) return parsed.error.errors[0].message;

	const {data} = parsed;
	const {email} = data;

	/* duplicate email */
	if (
		email &&
		(await prisma.user.count({where: {email, AND: {NOT: {id}}}})) > 0
	) {
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

export async function updateCurrency(currency: string) {
	const id = cookies().get("user")?.value;

	if (!id) return "Auth required";

	try {
		await prisma.user.update({where: {id}, data: {currency}});

		return null;
	} catch {
		return "Something went wrong";
	}
}

/*
 *------------------- EXPENSE -------------------
 */

export async function createExpense(input: unknown) {
	const parsed = UpsertExpenseSchema.safeParse(input);
	const userId = cookies().get("user")?.value;

	if (!parsed.success) return parsed.error.errors[0].message;
	if (!userId) return "Auth required";

	const data = {userId, ...parsed.data};

	try {
		await prisma.expense.create({data});
		revalidatePath("/expenses");
		return null;
	} catch {
		return "Something went wrong";
	}
}

export async function updateExpense(id: string, input: unknown) {
	const parsed = UpsertExpenseSchema.safeParse(input);
	const userId = cookies().get("user")?.value;

	if (!parsed.success) return parsed.error.errors[0].message;
	if (!userId) return "Auth required";

	const data = {userId, ...parsed.data};

	try {
		await prisma.expense.update({where: {id, AND: {userId}}, data});
		revalidatePath("/expenses");
		return null;
	} catch {
		return "Something went wrong";
	}
}

export async function deleteExpense(id: string) {
	const userId = cookies().get("user")?.value;

	if (!userId) return "Auth required";

	try {
		await prisma.expense.delete({where: {id, AND: {userId}}});
		revalidatePath("/expenses");
		return null;
	} catch {
		return "Something went wrong";
	}
}
