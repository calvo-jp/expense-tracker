"use server";

import {authOptions} from "@/config/auth-options";
import {prisma} from "@/config/prisma";
import assert from "assert";
import {getServerSession} from "next-auth";
import {revalidatePath} from "next/cache";
import {TUpdateProfileSchema} from "./schema";

export async function updateProfile(data: TUpdateProfileSchema) {
	const session = await getServerSession(authOptions);

	console.log({session});

	assert(session);

	const id = session.user.id;

	try {
		await prisma.user.update({where: {id}, data});
		revalidatePath("/(dashboard)", "layout");
		return null;
	} catch (e) {
		console.log(e);
		return "Something went wrong";
	}
}
