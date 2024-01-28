"use server";

import {prisma} from "@/config/prisma";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {TCreateAccountSchema} from "./schema";

export async function createAccount(data: TCreateAccountSchema) {
	if (await prisma.user.exists({email: data.email})) {
		return "Email already in use";
	}

	const user = await prisma.user.create({
		data,
		select: {
			id: true,
		},
	});

	cookies().set("user", user.id);
	redirect("/dashboard");
}
