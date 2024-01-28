"use server";

import {prisma} from "@/config/prisma";
import assert from "assert";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {TUpdateProfileSchema} from "./schema";

export async function updateProfile(data: TUpdateProfileSchema) {
	const id = cookies().get("user")?.value;

	assert(id);

	try {
		await prisma.user.update({where: {id}, data});
		revalidatePath("/(dashboard)", "layout");
		return null;
	} catch (e) {
		return "Something went wrong";
	}
}

export async function logout() {
	cookies().delete("user");
	revalidatePath("/(dashboard)");
	redirect("/");
}
