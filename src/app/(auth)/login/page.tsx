import {Button} from '@/components/button';
import {Input} from '@/components/input';
import {styled} from '@/styled-system/jsx';
import {Metadata} from 'next';

export const metadata: Metadata = {
	title: 'Login',
};

export default function Register() {
	return (
		<styled.form
			action={async (formdata) => {
				'use server';

				const email = formdata.get('email');
				const password = formdata.get('password');

				console.log({
					email,
					password,
				});
			}}
		>
			<Input mt={12} name="email" size="xl" placeholder="Email" />
			<Input
				mt={6}
				name="password"
				size="xl"
				type="password"
				placeholder="Password"
			/>
			<Button w="full" mt={8} size="xl" type="submit">
				Login
			</Button>
		</styled.form>
	);
}
