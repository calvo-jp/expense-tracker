'use server';

import {prisma} from '@/config/prisma';
import {CredentialsSchema} from '@/utils/types';
import bcrypt from 'bcrypt';
import {addDays} from 'date-fns';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

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
