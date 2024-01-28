"use client";

import {Spinner} from "@/app/spinner";
import {Button} from "@/components/button";
import {FormErrorMessage} from "@/components/form-error-message";
import {Input} from "@/components/input";
import {toast} from "@/components/toaster";
import {Box, styled} from "@/styled-system/jsx";
import {useConditionalRedirect} from "@/utils/use-conditional-redirect";
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn, useSession} from "next-auth/react";
import {useForm} from "react-hook-form";
import {createAccount} from "./actions";
import {CreateAccountSchema, TCreateAccountSchema} from "./schema";

export async function RegisterForm() {
	const session = useSession();

	const form = useForm<TCreateAccountSchema>({
		resolver: zodResolver(CreateAccountSchema),
		defaultValues: {
			name: "",
			email: "",
		},
	});

	useConditionalRedirect(session.status === "authenticated", "/dashboard");

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

					return;
				}

				const {email} = data;
				const response = await signIn("email", {
					email,
					redirect: false,
				});

				if (response?.error) {
					toast.error({
						title: "Error",
						description: "Something went wrong",
					});

					return;
				}

				toast.success({
					title: "Success",
					description: `Magic link sent to ${email}`,
				});
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

			<Button
				type="submit"
				w="full"
				size="xl"
				disabled={
					form.formState.isSubmitting || session.status !== "unauthenticated"
				}
			>
				{form.formState.isSubmitting ? <Spinner /> : "Submit"}
			</Button>
		</styled.form>
	);
}
