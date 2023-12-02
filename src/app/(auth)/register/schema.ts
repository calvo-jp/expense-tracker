import {z} from "zod";

export type TCreateAccountSchema = z.infer<typeof CreateAccountSchema>;
export const CreateAccountSchema = z.object({
	name: z.string().min(4, "Name too short").max(50, "Name too long"),
	email: z.string().email(),
	username: z
		.string()
		.min(5, "Username too short")
		.max(25, "Username too long")
		.regex(/^[a-z][a-z0-9]{4,}$/i, "Invalid username")
		.trim(),
	password: z
		.string()
		.min(8, "Password too short")
		.max(150, "Password too long"),
});
