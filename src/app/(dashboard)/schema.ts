import {z} from "zod";

export type TUpdateProfileSchema = z.infer<typeof UpdateProfileSchema>;
export const UpdateProfileSchema = z.object({
	name: z.string().min(4, "Name too short").max(50, "Name too long"),
});

export type TPaginationSchema = z.infer<typeof PaginationSchema>;
export const PaginationSchema = z
	.object({
		page: z
			.union([z.number(), z.string().transform(Number)])
			.nullable()
			.optional()
			.transform((v) => (v && v > 0 ? v : 1)),
		size: z
			.union([z.number(), z.string().transform(Number)])
			.nullable()
			.optional()
			.transform((v) => (v && [10, 25, 50].includes(v) ? v : 10)),
	})
	.optional()
	.nullable()
	.transform((v) => v ?? {page: 1, size: 10});
