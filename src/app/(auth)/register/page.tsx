import {Link} from '@/components/next-js/link';
import {Flex, styled} from '@/styled-system/jsx';
import {Metadata} from 'next';
import {RegisterForm} from './register-form';

export const metadata: Metadata = {
	title: 'Register',
};

export default function Register() {
	return (
		<>
			<RegisterForm />

			<Flex mt={5} gap={1} justifyContent="center">
				<styled.span color="fg.muted">Already have an account?</styled.span>
				<Link
					href="/login"
					_hover={{
						textDecoration: 'underline',
						textUnderlineOffset: '2px',
					}}
				>
					Log in
				</Link>
			</Flex>
		</>
	);
}
