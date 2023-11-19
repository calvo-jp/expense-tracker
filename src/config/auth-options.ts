import {PrismaAdapter} from '@auth/prisma-adapter';
import {AuthOptions} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
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
			async authorize() {
				return null;
			},
		}),
	],
};
