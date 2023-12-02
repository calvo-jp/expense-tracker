import {z} from "zod";

export type TLoginSchema = z.infer<typeof LoginSchema>;
export const LoginSchema = z.object({
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
