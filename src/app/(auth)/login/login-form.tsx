'use client';

import {Alert, AlertContent, AlertIcon, AlertTitle} from '@/components/alert';
import {Button} from '@/components/button';
import {Input} from '@/components/input';
import {styled} from '@/styled-system/jsx';
import {AlertCircleIcon} from 'lucide-react';
import {useFormState, useFormStatus} from 'react-dom';
import {login} from './actions';

export function LoginForm() {
	const [error, action] = useFormState(login, null);

	return (
		<styled.form action={action} autoComplete="off">
			{error && (
				<Alert mb={8}>
					<AlertIcon asChild>
						<AlertCircleIcon />
					</AlertIcon>
					<AlertContent>
						<AlertTitle>{error}</AlertTitle>
					</AlertContent>
				</Alert>
			)}

			<Input name="username" size="xl" placeholder="Username" />
			<Input
				mt={6}
				size="xl"
				name="password"
				type="password"
				placeholder="Password"
			/>

			<SubmitButton />
		</styled.form>
	);
}

export function SubmitButton() {
	const {pending} = useFormStatus();

	return (
		<Button type="submit" w="full" mt={8} size="xl" disabled={pending}>
			{pending ? 'Loading...' : 'Login'}
		</Button>
	);
}
