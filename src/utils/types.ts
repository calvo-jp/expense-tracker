import {z} from 'zod';

export const CredentialsSchema = z.object({
	username: z.string().min(5).max(25).trim(),
	password: z.string().min(8).max(150),
});
