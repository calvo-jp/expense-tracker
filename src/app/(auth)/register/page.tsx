import {Button} from '@/components/button';
import {Input} from '@/components/input';
import {styled} from '@/styled-system/jsx';
import {Metadata} from 'next';
import {register} from './actions';

export const metadata: Metadata = {
	title: 'Register',
};

export default function Register() {
	return (
		<styled.form action={register}>
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
