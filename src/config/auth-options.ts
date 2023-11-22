import {PrismaAdapter} from '@auth/prisma-adapter';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import {AuthOptions} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {z} from 'zod';
import {prisma} from './prisma';

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			credentials: {
				email: {
					type: 'email',
					label: 'Password',
				},
				password: {
					type: 'password',
					label: 'Password',
				},
			},
			async authorize(credentials) {
				const {email, password} = schema.parse(credentials);

				const user = await prisma.user.findUniqueOrThrow({
					where: {
						email,
					},
				});

				return (await bcrypt.compare(password, user.password))
					? _.omit(user, ['password'])
					: null;
			},
		}),
	],
	pages: {
		error: '/login',
		signIn: '/login',
		signOut: '/login',
	},
};

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(150),
});
