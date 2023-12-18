import {z} from "zod";

export type TLoginSchema = z.infer<typeof LoginSchema>;
export const LoginSchema = z.object({
	email: z.string().email(),
});
