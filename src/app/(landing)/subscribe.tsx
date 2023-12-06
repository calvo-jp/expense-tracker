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
				display={{
					base: "flex",
					lg: "block",
				}}
				gap={{
					base: 3,
					lg: 0,
				}}
				onSubmit={form.handleSubmit(() => {
					toast.create({
						title: "Error",
						description: "This feature is not yet implemented",
					});

					form.reset();
				})}
			>
				<Input
					size={{
						base: "lg",
						lg: "md",
					}}
					placeholder="Email"
					{...form.register("email")}
				/>

				<Button
					type="submit"
					variant="solid"
					w={{
						lg: "full",
					}}
					px={6}
					mt={{
						lg: 5,
					}}
					size={{
						base: "lg",
						lg: "md",
					}}
					flexShrink={0}
				>
					Subscribe
				</Button>
			</styled.form>
		</>
	);
}
