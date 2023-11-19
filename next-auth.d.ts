import {User} from '@prisma/client';
import 'next-auth';

type SensitiveData = 'password';

declare module 'next-auth' {
	interface Session {
		user: Omit<User, SensitiveData>;
	}
}
