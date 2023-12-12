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
import {login} from "./actions";
import {LoginSchema, TLoginSchema} from "./schema";

export function LoginForm() {
	const [pending, startTransition] = useTransition();

	const router = useRouter();
	const form = useForm<TLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
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
					const error = await login(data);

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
					placeholder="Username"
					autoFocus
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
				Login
			</Button>
		</styled.form>
	);
}
