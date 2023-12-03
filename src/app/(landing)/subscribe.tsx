"use client";

import {Button} from "@/components/button";
import {Input} from "@/components/input";
import {toast} from "@/components/toaster";
import {Box, styled} from "@/styled-system/jsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

const SubscribeSchema = z.object({
	email: z.string().email(),
});

export function Subscribe() {
	const form = useForm<z.infer<typeof SubscribeSchema>>({
		resolver: zodResolver(SubscribeSchema),
		defaultValues: {
			email: "",
		},
	});

	return (
		<>
			<Box fontFamily="heading" textTransform="uppercase" color="fg.subtle">
				Newsletter
			</Box>
			<styled.form
				mt={5}
				onSubmit={form.handleSubmit(() => {
					toast.create({
						title: "Error",
						description: "This feature is not yet implemented",
					});

					form.reset();
				})}
			>
				<Input placeholder="Email" {...form.register("email")} />
				<Button type="submit" w="full" mt={4}>
					Subscribe
				</Button>
			</styled.form>
		</>
	);
}
