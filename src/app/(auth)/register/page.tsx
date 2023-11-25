import {Button} from '@/components/button';
import {Input} from '@/components/input';
import {styled} from '@/styled-system/jsx';
import {CredentialsSchema} from '@/utils/types';
import {createUser} from '@/utils/user';
import {addDays} from 'date-fns';
import {Metadata} from 'next';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

export const metadata: Metadata = {
	title: 'Register',
};

export default function Register() {
	return (
		<styled.form
			action={async (formdata) => {
				'use server';

				const cookieStore = cookies();

				const input = CredentialsSchema.parse({
					username: formdata.get('username'),
					password: formdata.get('password'),
				});

				const user = await createUser(input);

				cookieStore.set('user', user.id, {expires: addDays(new Date(), 30)});
				redirect('/dashboard');
			}}
		>
			<Input mt={12} name="username" size="xl" placeholder="Username" />
			<Input
				mt={6}
				size="xl"
				type="password"
				name="password"
				placeholder="Password"
			/>
			<Button w="full" mt={8} size="xl" type="submit">
				Submit
			</Button>
		</styled.form>
	);
}
