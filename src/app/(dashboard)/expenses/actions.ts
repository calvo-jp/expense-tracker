"use server";

import {prisma} from "@/config/prisma";
import assert from "assert";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";
import {TUpsertExpenseSchema} from "./schema";

export async function createExpense(data: TUpsertExpenseSchema) {
	const userId = cookies().get("user")?.value;

	assert(userId);

	try {
		await prisma.expense.create({data: {...data, userId}});
		revalidatePath("/expenses");
		return null;
	} catch {
		return "Something went wrong";
	}
}

export async function updateExpense(id: string, data: TUpsertExpenseSchema) {
	const userId = cookies().get("user")?.value;

	assert(userId);

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

	assert(userId);

	try {
		await prisma.expense.delete({where: {id, AND: {userId}}});
		revalidatePath("/expenses");
		return null;
	} catch {
		return "Something went wrong";
	}
}
