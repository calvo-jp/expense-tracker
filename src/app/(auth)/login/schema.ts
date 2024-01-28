import {z} from "zod";

export type TLoginSchema = z.infer<typeof LoginSchema>;
export const LoginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, "Password too short")
		.max(150, "Password too long"),
});
