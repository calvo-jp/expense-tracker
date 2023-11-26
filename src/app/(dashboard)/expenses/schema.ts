import {stringToPrismaEnum} from '@/utils/string-to-prisma-enum';
import {ExpenseCategory} from '@prisma/client';
import {z} from 'zod';

export const CreateExpenseSchema = z.object({
	category: z.preprocess((value) => {
		return stringToPrismaEnum(ExpenseCategory, value);
	}, z.nativeEnum(ExpenseCategory)),
	description: z.string().trim().min(4).max(150),
	location: z.string().trim().max(150).optional(),
	amount: z.preprocess(Number, z.number().min(1)),
	transactionDate: z.union([z.string().pipe(z.coerce.date()), z.date()]),
});

export type TCreateExpenseSchema = z.infer<typeof CreateExpenseSchema>;

export const UpdateExpenseSchema = CreateExpenseSchema.extend({
	id: z.string(),
});

export type TUpdateExpenseSchema = z.infer<typeof UpdateExpenseSchema>;

export const DeleteExpenseSchema = z.object({
	id: z.string(),
});

export type TDeleteExpenseSchema = z.infer<typeof DeleteExpenseSchema>;
