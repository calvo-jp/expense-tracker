'use server';

import {formdataToJson} from '@/utils/formdata-to-json';
import {ExpenseCategory} from '@prisma/client';
import {z} from 'zod';

const CreateExpenseSchema = z.object({
	category: z.nativeEnum(ExpenseCategory),
	description: z.string().min(5).max(150),
	location: z.string().min(5).max(150).optional(),
	amount: z.number().min(1),
	transactionDate: z
		.string()
		.min(5)
		.max(150)
		.transform((v) => new Date(v)),
});

export async function createExpense(_: unknown, formdata: FormData) {
	const parsed = CreateExpenseSchema.safeParse(formdataToJson(formdata));
}

export async function updateExpense(_: unknown, formdata: FormData) {}

export async function deleteExpense(_: unknown, formdata: FormData) {}
