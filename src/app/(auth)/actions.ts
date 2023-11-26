'use server';

import {prisma} from '@/config/prisma';
import bcrypt from 'bcrypt';
import {addDays} from 'date-fns';
import {cookies} from 'next/headers';
import {CredentialsSchema} from './schema';

export async function login(input: unknown) {
	const parsed = CredentialsSchema.safeParse(input);

	if (!parsed.success) return parsed.error.errors[0].message;

	const {username, password} = parsed.data;

	try {
		const user = await prisma.user.findUniqueOrThrow({where: {username}});
		const matches = await bcrypt.compare(password, user.password);

		if (!matches) throw new Error();

		cookies().set('user', user.id, {expires: addDays(new Date(), 30)});
		return null;
	} catch {
		return 'Invalid username or password';
	}
}

export async function register(input: unknown) {
	const parsed = CredentialsSchema.safeParse(input);

	if (!parsed.success) return parsed.error.errors[0].message;

	let {username, password} = parsed.data;

	password = await bcrypt.hash(password, await bcrypt.genSalt(16));

	try {
		const user = await prisma.user.create({
			data: {
				username,
				password,
			},
			select: {
				id: true,
			},
		});

		cookies().set('user', user.id, {expires: addDays(new Date(), 30)});
		return null;
	} catch {
		return 'Invalid username or password';
	}
}
