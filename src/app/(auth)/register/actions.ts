'use server';

import {prisma} from '@/config/prisma';
import {CredentialsSchema} from '@/utils/types';
import bcrypt from 'bcrypt';
import {addDays} from 'date-fns';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

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
