import {Button} from '@/components/button';
import {Input} from '@/components/input';
import {styled} from '@/styled-system/jsx';
import {Metadata} from 'next';
import {login} from './actions';

export const metadata: Metadata = {
	title: 'Login',
};

export default function Login() {
	return (
		<styled.form action={login}>
			<Input mt={12} name="username" size="xl" placeholder="Username" />
			<Input
				mt={6}
				size="xl"
				name="password"
				type="password"
				placeholder="Password"
			/>
			<Button w="full" mt={8} size="xl" type="submit">
				Login
			</Button>
		</styled.form>
	);
}
