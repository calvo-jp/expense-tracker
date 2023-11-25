'use server';

import {prisma} from '@/config/prisma';
import {formdataToJson} from '@/utils/formdata-to-json';
import assert from 'assert';
import bcrypt from 'bcrypt';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {z} from 'zod';

export async function logout() {
	const cookieStore = cookies();
	cookieStore.delete('user');
	redirect('/');
}

const ChangePasswordSchema = z
	.object({
		oldPassword: z.string(),
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
				message: "Passwords don't match",
			});
		}
	});

export async function changePassword(_: unknown, formdata: FormData) {
	const cookieStore = cookies();

	try {
		const id = cookieStore.get('user')?.value;

		assert(id);

		const user = await prisma.user.findUniqueOrThrow({where: {id}});
		const parsed = ChangePasswordSchema.safeParse(formdataToJson(formdata));

		if (!parsed.success) return parsed.error.errors[0].message;

		const matches = await bcrypt.compare(
			parsed.data.oldPassword,
			user.password,
		);

		if (!matches) return 'Old password is incorrect';

		await prisma.user.update({
			where: {id},
			data: {
				password: await bcrypt.hash(
					parsed.data.newPassword,
					await bcrypt.genSalt(16),
				),
			},
		});

		return null;
	} catch {
		return 'Something went wrong';
	}
}
