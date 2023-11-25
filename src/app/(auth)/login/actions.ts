'use server';

import {CredentialsSchema} from '@/utils/types';
import {getUser} from '@/utils/user';
import bcrypt from 'bcrypt';
import {addDays} from 'date-fns';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

export async function login(formdata: FormData) {
	const cookieStore = cookies();

	const {username, password} = CredentialsSchema.parse({
		username: formdata.get('username'),
		password: formdata.get('password'),
	});

	const user = await getUser({username});

	if (await bcrypt.compare(password, user.password)) {
		cookieStore.set('user', user.id, {expires: addDays(new Date(), 30)});
		redirect('/dashboard');
	}
}
