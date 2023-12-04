"use client";

import {Button} from "@/components/button";
import {ErrorMessage} from "@/components/error-message";
import {Input} from "@/components/input";
import {Textarea} from "@/components/textarea";
import {toast} from "@/components/toaster";
import {Box, Flex, styled} from "@/styled-system/jsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

const ContactUsSchema = z.object({
	name: z.string().min(2, "Name too short").max(25, "Name too long").trim(),
	email: z.string().email(),
	message: z
		.string()
		.min(5, "Message too short")
		.max(255, "Message too long")
		.trim(),
});

export function ContactUs() {
	const form = useForm<z.infer<typeof ContactUsSchema>>({
		resolver: zodResolver(ContactUsSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	return (
		<Box
			id="contact-us"
			maxW="breakpoint-md"
			mx="auto"
			py={{
				base: 16,
				lg: 24,
			}}
			px={{
				base: 4,
				lg: 8,
			}}
		>
			<styled.h2
				textAlign="center"
				fontFamily="heading"
				fontWeight="bold"
				fontSize={{
					base: "3xl",
					lg: "4xl",
				}}
			>
				Get in Touch
			</styled.h2>

			<styled.form
				mt={{
					base: 10,
					lg: 12,
				}}
				maxW="24rem"
				mx="auto"
				display="flex"
				flexDir="column"
				gap={5}
				onSubmit={form.handleSubmit((data) => {
					toast.create({
						title: "Error",
						description: "This feature is not yet implemented",
					});

					form.reset();
				})}
			>
				<Flex flexDir="column" gap={2}>
					<Input size="xl" placeholder="Name" {...form.register("name")} />
					<ErrorMessage>{form.formState.errors.name?.message}</ErrorMessage>
				</Flex>
				<Flex flexDir="column" gap={2}>
					<Input size="xl" placeholder="Email" {...form.register("email")} />
					<ErrorMessage>{form.formState.errors.email?.message}</ErrorMessage>
				</Flex>
				<Flex flexDir="column" gap={2}>
					<Textarea
						size="xl"
						placeholder="Message"
						rows={4}
						{...form.register("message")}
					/>
					<ErrorMessage>{form.formState.errors.message?.message}</ErrorMessage>
				</Flex>

				<Button type="submit" size="xl" display="block">
					Submit
				</Button>
			</styled.form>
		</Box>
	);
}
