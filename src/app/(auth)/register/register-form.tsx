"use client";

import {Spinner} from "@/app/spinner";
import {Button} from "@/components/button";
import {FormErrorMessage} from "@/components/form-error-message";
import {Input} from "@/components/input";
import {toast} from "@/components/toaster";
import {Box, styled} from "@/styled-system/jsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {createAccount} from "./actions";
import {CreateAccountSchema, TCreateAccountSchema} from "./schema";

export async function RegisterForm() {
	const form = useForm<TCreateAccountSchema>({
		resolver: zodResolver(CreateAccountSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	return (
		<styled.form
			display="flex"
			flexDir="column"
			gap={6}
			onSubmit={form.handleSubmit(async (data) => {
				const error = await createAccount(data);

				if (error) {
					toast.error({
						title: "Error",
						description: error,
					});
				}
			})}
		>
			<Box>
				<Input
					size="xl"
					placeholder="Name"
					autoFocus
					{...form.register("name")}
				/>
				<FormErrorMessage mt={1.5}>
					{form.formState.errors.name?.message}
				</FormErrorMessage>
			</Box>
			<Box>
				<Input
					size="xl"
					type="email"
					placeholder="Email"
					{...form.register("email")}
				/>
				<FormErrorMessage mt={1.5}>
					{form.formState.errors.email?.message}
				</FormErrorMessage>
			</Box>
			<Box>
				<Input
					size="xl"
					type="password"
					placeholder="Password"
					{...form.register("password")}
				/>
				<FormErrorMessage mt={1.5}>
					{form.formState.errors.password?.message}
				</FormErrorMessage>
			</Box>

			<Button
				type="submit"
				w="full"
				size="xl"
				disabled={form.formState.isSubmitting}
			>
				{form.formState.isSubmitting ? <Spinner /> : "Submit"}
			</Button>
		</styled.form>
	);
}
