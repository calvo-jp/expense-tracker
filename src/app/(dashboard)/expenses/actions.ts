"use server";

import {authOptions} from "@/config/auth-options";
import {prisma} from "@/config/prisma";
import assert from "assert";
import {getServerSession} from "next-auth";
import {revalidatePath} from "next/cache";
import {TUpsertExpenseSchema} from "./schema";

export async function createExpense(data: TUpsertExpenseSchema) {
	const session = await getServerSession(authOptions);

	assert(session);

	const userId = session.user.id;

	try {
		await prisma.expense.create({data: {...data, userId}});
		revalidatePath("/expenses");
		return null;
	} catch {
		return "Something went wrong";
	}
}

export async function updateExpense(id: string, data: TUpsertExpenseSchema) {
	const session = await getServerSession(authOptions);

	assert(session);

	const userId = session.user.id;

	try {
		await prisma.expense.update({where: {id, AND: {userId}}, data});
		revalidatePath("/expenses");
		return null;
	} catch {
		return "Something went wrong";
	}
}

export async function deleteExpense(id: string) {
	const session = await getServerSession(authOptions);

	assert(session);

	const userId = session.user.id;

	try {
		await prisma.expense.delete({where: {id, AND: {userId}}});
		revalidatePath("/expenses");
		return null;
	} catch {
		return "Something went wrong";
	}
}
