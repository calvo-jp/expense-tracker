import {stringToPrismaEnum} from "@/utils/string-to-prisma-enum";
import {ExpenseCategory} from "@prisma/client";
import {z} from "zod";

export type TUpsertExpenseSchema = z.infer<typeof UpsertExpenseSchema>;
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

export type TExpenseFilterSchema = z.infer<typeof ExpenseFilterSchema>;
export const ExpenseFilterSchema = z
	.object({
		category: z
			.union([
				z.nativeEnum(ExpenseCategory),
				z.array(z.nativeEnum(ExpenseCategory)),
			])
			.optional()
			.nullable()
			.catch(() => undefined)
			.transform((v) => (!v ? v : Array.isArray(v) ? v : [v])),
		location: z
			.string()
			.optional()
			.nullable()
			.catch(() => undefined),
		minAmount: z
			.string()
			.pipe(z.coerce.number())
			.optional()
			.nullable()
			.catch(() => undefined),
		maxAmount: z
			.string()
			.pipe(z.coerce.number())
			.optional()
			.nullable()
			.catch(() => undefined),
		transactionDateStart: z
			.string()
			.pipe(z.coerce.date())
			.optional()
			.nullable()
			.catch(() => undefined),
		transactionDateUntil: z
			.string()
			.pipe(z.coerce.date())
			.optional()
			.nullable()
			.catch(() => undefined),
	})
	.catch(() => ({}));
