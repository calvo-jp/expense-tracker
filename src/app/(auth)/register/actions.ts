'use server';

import {CredentialsSchema} from '@/utils/types';
import {createUser} from '@/utils/user';
import {addDays} from 'date-fns';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

export async function register(formdata: FormData) {
	const cookieStore = cookies();

	const input = CredentialsSchema.parse({
		username: formdata.get('username'),
		password: formdata.get('password'),
	});

	const user = await createUser(input);

	cookieStore.set('user', user.id, {expires: addDays(new Date(), 30)});
	redirect('/dashboard');
}
