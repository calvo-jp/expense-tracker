import {Button} from '@/components/button';
import {Input} from '@/components/input';
import {prisma} from '@/config/prisma';
import {styled} from '@/styled-system/jsx';
import bcrypt from 'bcrypt';
import {addDays} from 'date-fns';
import {Metadata} from 'next';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {z} from 'zod';

export const metadata: Metadata = {
	title: 'Register',
};

export default function Register() {
	return (
		<styled.form
			action={async (formdata) => {
				'use server';

				const cookieStore = cookies();

				const input = RegisterSchema.parse({
					username: formdata.get('username'),
					password: formdata.get('password'),
				});

				const user = await prisma.user.create({
					data: {
						username: input.username,
						password: await bcrypt.hash(
							input.password,
							await bcrypt.genSalt(16),
						),
					},
				});

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

const RegisterSchema = z
	.object({
		username: z.string().min(5).max(25).trim(),
		password: z.string().min(8).max(150),
	})
	.required();
