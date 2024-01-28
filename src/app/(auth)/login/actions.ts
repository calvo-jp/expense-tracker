"use server";

import {prisma} from "@/config/prisma";
import bcrypt from "bcrypt";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {TLoginSchema} from "./schema";

export async function login({email, password}: TLoginSchema) {
	const user = await prisma.user.findUnique({where: {email}});

	if (!user) return "Account not found";

	const matches = await bcrypt.compare(password, user.password);

	if (!matches) return "Account not found";

	cookies().set("user", user.id);
	redirect("/dashboard");
}
