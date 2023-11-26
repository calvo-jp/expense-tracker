'use server';

import {prisma} from '@/config/prisma';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import {
	CreateExpenseSchema,
	DeleteExpenseSchema,
	UpdateExpenseSchema,
} from './schema';

export async function createExpense(input: unknown) {
	const parsed = CreateExpenseSchema.safeParse(input);
	const userId = cookies().get('user')?.value;

	if (!parsed.success) return parsed.error.errors[0].message;
	if (!userId) return 'Auth required';

	const data = {userId, ...parsed.data};

	try {
		await prisma.expense.create({data});
		revalidatePath('/expenses');
		return null;
	} catch {
		return 'Something went wrong';
	}
}

export async function updateExpense(input: unknown) {
	const parsed = UpdateExpenseSchema.safeParse(input);
	const userId = cookies().get('user')?.value;

	if (!parsed.success) return parsed.error.errors[0].message;
	if (!userId) return 'Auth required';

	const {id, ...others} = parsed.data;
	const data = {userId, ...others};

	try {
		await prisma.expense.update({where: {id, AND: {userId}}, data});
		revalidatePath('/expenses');
		return null;
	} catch {
		return 'Something went wrong';
	}
}

export async function deleteExpense(input: unknown) {
	const parsed = DeleteExpenseSchema.safeParse(input);
	const userId = cookies().get('user')?.value;

	if (!parsed.success) return parsed.error.errors[0].message;
	if (!userId) return 'Auth required';

	const {id} = parsed.data;

	try {
		await prisma.expense.delete({where: {id, AND: {userId}}});
		revalidatePath('/expenses');
		return null;
	} catch {
		return 'Something went wrong';
	}
}
