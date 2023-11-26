import {z} from 'zod';

export const ChangePasswordSchema = z
	.object({
		oldPassword: z
			.string()
			.min(8, 'Old password too short')
			.max(150, 'Old password too long'),
		newPassword: z
			.string()
			.min(8, 'Password too short')
			.max(150, 'Password too long'),
		confirmPassword: z.string(),
	})
	.superRefine(({newPassword, confirmPassword}, ctx) => {
		if (newPassword !== confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				path: ['confirmPassword'],
				message: "Passwords don't match",
			});
		}
	});

export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;

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
