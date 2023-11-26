import {stringToPrismaEnum} from '@/utils/string-to-prisma-enum';
import {ExpenseCategory} from '@prisma/client';
import {z} from 'zod';

export const UpsertExpenseSchema = z.object({
	category: z.preprocess(
		(value) => stringToPrismaEnum(ExpenseCategory, value),
		z.nativeEnum(ExpenseCategory),
	),
	description: z.string().trim().min(4).max(150),
	location: z.string().trim().max(150).optional(),
	amount: z.preprocess(Number, z.number().min(1)),
	transactionDate: z.union([z.string().pipe(z.coerce.date()), z.date()]),
});

export type TUpsertExpenseSchema = z.infer<typeof UpsertExpenseSchema>;
