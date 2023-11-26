'use server';

import {prisma} from '@/config/prisma';
import bcrypt from 'bcrypt';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {ChangePasswordSchema} from './schema';

export async function logout() {
	cookies().delete('user');
	redirect('/');
}

export async function changePassword(input: unknown) {
	const id = cookies().get('user')?.value;

	if (!id) return 'Auth required';

	try {
		const user = await prisma.user.findUniqueOrThrow({where: {id}});
		const parsed = ChangePasswordSchema.safeParse(input);

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
