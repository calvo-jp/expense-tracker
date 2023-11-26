'use client';

import {Button} from '@/components/button';
import {Input} from '@/components/input';
import {Link} from '@/components/next-js/link';
import {toast} from '@/components/toaster';
import {Flex, styled} from '@/styled-system/jsx';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'next/navigation';
import {useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {register} from '../actions';
import {CredentialsSchema} from '../schema';

export default function Register() {
	const [pending, startTransition] = useTransition();

	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(CredentialsSchema),
	});

	return (
		<>
			<styled.form
				onSubmit={form.handleSubmit((data) => {
					return startTransition(async () => {
						const error = await register(data);

						if (error) {
							toast.error({
								title: 'Error',
								description: error,
							});
						} else {
							router.push('/dashboard');
						}
					});
				})}
			>
				<Input
					size="xl"
					placeholder="Username"
					{...form.register('username')}
				/>
				<Input
					mt={6}
					size="xl"
					type="password"
					placeholder="Password"
					{...form.register('password')}
				/>

				<Button type="submit" w="full" mt={8} size="xl" disabled={pending}>
					Submit
				</Button>
			</styled.form>

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
