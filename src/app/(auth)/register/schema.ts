import {z} from "zod";

export type TCreateAccountSchema = z.infer<typeof CreateAccountSchema>;
export const CreateAccountSchema = z.object({
	name: z.string().min(4, "Name too short").max(50, "Name too long"),
	email: z.string().email(),
});
