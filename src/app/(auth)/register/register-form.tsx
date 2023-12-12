"use client";

import {Button} from "@/components/button";
import {ErrorMessage} from "@/components/error-message";
import {Input} from "@/components/input";
import {toast} from "@/components/toaster";
import {Box, styled} from "@/styled-system/jsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useTransition} from "react";
import {useForm} from "react-hook-form";
import {createAccount} from "./actions";
import {CreateAccountSchema, TCreateAccountSchema} from "./schema";

export function RegisterForm() {
	const [pending, startTransition] = useTransition();

	const router = useRouter();
	const form = useForm<TCreateAccountSchema>({
		resolver: zodResolver(CreateAccountSchema),
		defaultValues: {
			name: "",
			email: "",
			username: "",
			password: "",
		},
	});

	return (
		<styled.form
			display="flex"
			flexDir="column"
			gap={6}
			onSubmit={form.handleSubmit((data) => {
				return startTransition(async () => {
					const error = await createAccount(data);

					if (error) {
						toast.error({
							title: "Error",
							description: error,
						});
					} else {
						router.push("/dashboard");
					}
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
				<ErrorMessage mt={1.5}>
					{form.formState.errors.name?.message}
				</ErrorMessage>
			</Box>
			<Box>
				<Input
					size="xl"
					type="email"
					placeholder="Email"
					{...form.register("email")}
				/>
				<ErrorMessage mt={1.5}>
					{form.formState.errors.email?.message}
				</ErrorMessage>
			</Box>
			<Box>
				<Input
					size="xl"
					placeholder="Username"
					{...form.register("username")}
				/>
				<ErrorMessage mt={1.5}>
					{form.formState.errors.username?.message}
				</ErrorMessage>
			</Box>
			<Box>
				<Input
					size="xl"
					type="password"
					placeholder="Password"
					{...form.register("password")}
				/>
				<ErrorMessage mt={1.5}>
					{form.formState.errors.password?.message}
				</ErrorMessage>
			</Box>

			<Button type="submit" w="full" size="xl" disabled={pending}>
				Submit
			</Button>
		</styled.form>
	);
}
