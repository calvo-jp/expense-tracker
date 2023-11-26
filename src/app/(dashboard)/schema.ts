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
