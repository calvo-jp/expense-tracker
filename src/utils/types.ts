import {stringToPrismaEnum} from "@/utils/string-to-prisma-enum";
import {ExpenseCategory} from "@prisma/client";
import {z} from "zod";

export type TLoginSchema = z.infer<typeof LoginSchema>;
export const LoginSchema = z.object({
	username: z
		.string()
		.min(5, "Username too short")
		.max(25, "Username too long")
		.regex(/^[a-z][a-z0-9]{4,}$/i, "Invalid username")
		.trim(),
	password: z
		.string()
		.min(8, "Password too short")
		.max(150, "Password too long"),
});

export type TCreateAccountSchema = z.infer<typeof CreateAccountSchema>;
export const CreateAccountSchema = LoginSchema.extend({
	name: z.string().min(4, "Name too short").max(50, "Name too long"),
	email: z.string().email(),
});

export type TUpdateProfileSchema = z.infer<typeof UpdateProfileSchema>;
export const UpdateProfileSchema = z.object({
	name: z
		.string()
		.optional()
		.nullable()
		.transform((v) => (!v ? undefined : v)),
	email: z
		.string()
		.email()
		.optional()
		.nullable()
		.transform((v) => (!v ? undefined : v)),
});

export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
export const ChangePasswordSchema = z
	.object({
		oldPassword: z
			.string()
			.min(8, "Old password too short")
			.max(150, "Old password too long"),
		newPassword: z
			.string()
			.min(8, "Password too short")
			.max(150, "Password too long"),
		confirmPassword: z.string(),
	})
	.superRefine(({newPassword, confirmPassword}, ctx) => {
		if (newPassword !== confirmPassword) {
			ctx.addIssue({
				code: "custom",
				path: ["confirmPassword"],
				message: "Passwords don't match",
			});
		}
	});

export type TPaginationSchema = z.infer<typeof PaginationSchema>;
export const PaginationSchema = z
	.object({
		page: z
			.union([z.number(), z.string().transform(Number)])
			.nullable()
			.optional()
			.transform((v) => (v && v > 0 ? v : 1)),
		size: z
			.union([z.number(), z.string().transform(Number)])
			.nullable()
			.optional()
			.transform((v) => (v && [10, 25, 50].includes(v) ? v : 10)),
	})
	.optional()
	.nullable()
	.transform((v) => v ?? {page: 1, size: 10});

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
export const ExpenseFilterSchema = z.object({
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
});
