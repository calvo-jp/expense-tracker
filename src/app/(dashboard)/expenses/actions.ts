'use server';

import {prisma} from '@/config/prisma';
import {formdataToJson} from '@/utils/formdata-to-json';
import {ExpenseCategory} from '@prisma/client';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import assert from 'node:assert';
import {z} from 'zod';

const CreateExpenseSchema = z.object({
	category: z.preprocess((value) => {
		if (typeof value === 'string') {
			return value.replace(/\s/g, '');
		} else {
			return value;
		}
	}, z.nativeEnum(ExpenseCategory)),
	description: z.string().trim().max(150).optional(),
	location: z.string().trim().max(150).optional(),
	amount: z.preprocess(Number, z.number().min(0)),
	transactionDate: z.string().pipe(z.coerce.date()),
});

export async function createExpense(_: unknown, formdata: FormData) {
	const input = formdataToJson(formdata);
	const parsed = CreateExpenseSchema.safeParse(input);
	const userId = cookies().get('user')?.value;

	if (!parsed.success) return parsed.error.errors[0].message;

	try {
		assert(userId);

		const data = Object.assign({userId}, parsed.data);

		await prisma.expense.create({data});

		revalidatePath('/expenses');
		return null;
	} catch {
		return 'Something went wrong';
	}
}

export async function updateExpense(_: unknown, formdata: FormData) {}

export async function deleteExpense(_: unknown, formdata: FormData) {}
