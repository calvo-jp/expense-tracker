'use server';

import {prisma} from '@/config/prisma';
import bcrypt from 'bcrypt';
import {addDays} from 'date-fns';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {z} from 'zod';

export const CredentialsSchema = z.object({
	username: z
		.string()
		.min(5, 'Username too short')
		.max(25, 'Username too long')
		.regex(/^[a-z][a-z0-9]{4,}$/i, 'Invalid username')
		.trim(),
	password: z
		.string()
		.min(8, 'Password too short')
		.max(150, 'Password too long'),
});

export async function login(_: unknown, formdata: FormData) {
	const cookieStore = cookies();

	try {
		const {username, password} = CredentialsSchema.parse({
			username: formdata.get('username'),
			password: formdata.get('password'),
		});

		const user = await prisma.user.findUniqueOrThrow({where: {username}});
		const matches = await bcrypt.compare(password, user.password);

		if (!matches) throw new Error();

		cookieStore.set('user', user.id, {expires: addDays(new Date(), 30)});
		redirect('/dashboard');
	} catch (error) {
		return 'Invalid username or password';
	}
}

export async function register(_: unknown, formdata: FormData) {
	const cookieStore = cookies();

	try {
		const data = CredentialsSchema.parse({
			username: formdata.get('username'),
			password: formdata.get('password'),
		});

		data.password = await bcrypt.hash(data.password, await bcrypt.genSalt(16));

		const user = await prisma.user.create({data});

		cookieStore.set('user', user.id, {expires: addDays(new Date(), 30)});
		redirect('/dashboard');
	} catch (error) {
		return 'Invalid username or password';
	}
}
