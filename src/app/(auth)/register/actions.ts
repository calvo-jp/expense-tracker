"use server";

import {prisma} from "@/config/prisma";
import {TCreateAccountSchema} from "./schema";

export async function createAccount(data: TCreateAccountSchema) {
	const {email} = data;

	if (await prisma.user.exists({email})) return "Email already in use";

	try {
		await prisma.user.create({data, select: {}});

		return null;
	} catch {
		return "Something went wrong";
	}
}
