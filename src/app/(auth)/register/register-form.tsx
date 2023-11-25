'use client';

import {Alert, AlertIcon, AlertTitle} from '@/components/alert';
import {Button} from '@/components/button';
import {Input} from '@/components/input';
import {styled} from '@/styled-system/jsx';
import {AlertCircleIcon} from 'lucide-react';
import {useFormState, useFormStatus} from 'react-dom';
import {register} from './actions';

export function RegisterForm() {
	const [error, action] = useFormState(register, null);

	return (
		<styled.form action={action}>
			{error && (
				<Alert mb={8}>
					<AlertIcon asChild>
						<AlertCircleIcon />
					</AlertIcon>
					<AlertTitle>{error}</AlertTitle>
				</Alert>
			)}

			<Input name="username" size="xl" placeholder="Username" />
			<Input
				mt={6}
				size="xl"
				type="password"
				name="password"
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
			{pending ? 'Loading...' : 'Submit'}
		</Button>
	);
}
