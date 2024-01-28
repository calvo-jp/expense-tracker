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
import {useSearchParams} from "next/navigation";
import {useForm} from "react-hook-form";
import {LoginSchema, TLoginSchema} from "./schema";

export function LoginForm() {
	const session = useSession();

	const form = useForm<TLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
		},
	});

	const callbackUrl = useCallbackUrl();

	useConditionalRedirect(session.status === "authenticated", callbackUrl);

	return (
		<styled.form
			display="flex"
			flexDir="column"
			gap={6}
			onSubmit={form.handleSubmit(async ({email}) => {
				const response = await signIn("email", {
					redirect: false,
					email,
				});

				if (response?.error) {
					toast.error({
						title: "Error",
						description: "Account not found",
					});
				} else {
					toast.success({
						title: "Success",
						description: `Magic link sent to ${email}`,
					});
				}
			})}
		>
			<Box>
				<Input
					size="xl"
					type="email"
					placeholder="Email"
					autoFocus
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
				{form.formState.isSubmitting ? <Spinner /> : "Login"}
			</Button>
		</styled.form>
	);
}

function useCallbackUrl(fallback = "/dashboard") {
	const search = useSearchParams();

	return !search.has("callbackUrl")
		? fallback
		: new URL(search.get("callbackUrl")!).pathname;
}
