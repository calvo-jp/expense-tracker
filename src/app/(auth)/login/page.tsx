import {Button} from '@/components/button';
import {Input} from '@/components/input';
import {Box} from '@/styled-system/jsx';
import {Metadata} from 'next';

export const metadata: Metadata = {
	title: 'Login',
};

export default function Register() {
	return (
		<Box>
			<Input mt={12} size="xl" placeholder="Email" />
			<Input mt={6} size="xl" placeholder="Password" />
			<Button w="full" mt={8} size="xl">
				Login
			</Button>
		</Box>
	);
}
