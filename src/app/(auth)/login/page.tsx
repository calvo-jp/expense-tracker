"use client";

import {Button} from "@/components/button";
import {Code} from "@/components/code";
import {ErrorMessage} from "@/components/error-message";
import {Icon} from "@/components/icon";
import {IconButton} from "@/components/icon-button";
import {Input} from "@/components/input";
import {Link} from "@/components/next-js/link";
import {
	Popover,
	PopoverArrow,
	PopoverArrowTip,
	PopoverContent,
	PopoverPositioner,
	PopoverTrigger,
} from "@/components/popover";
import {toast} from "@/components/toaster";
import {Box, Flex, styled} from "@/styled-system/jsx";
import {Portal} from "@ark-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {FlaskConicalIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useTransition} from "react";
import {useForm} from "react-hook-form";
import {login} from "./actions";
import {LoginSchema, TLoginSchema} from "./schema";

export default function Login() {
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
		<>
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

			<Flex mt={5} gap={1} justifyContent="center">
				<styled.span color="fg.muted">Don&rsquo;t have an account?</styled.span>
				<Link
					href="/register"
					_hover={{
						textDecoration: "underline",
						textUnderlineOffset: "2px",
					}}
				>
					Register
				</Link>
			</Flex>

			<Popover
				positioning={{
					placement: "left-start",
				}}
			>
				<Portal>
					<PopoverTrigger asChild>
						<IconButton
							variant="ghost"
							pos="absolute"
							right={{
								base: 4,
								lg: 6,
							}}
							bottom={{
								base: 4,
								lg: 6,
							}}
						>
							<Icon size="lg">
								<FlaskConicalIcon />
							</Icon>
						</IconButton>
					</PopoverTrigger>
				</Portal>

				<Portal>
					<PopoverPositioner>
						<PopoverContent>
							<PopoverArrow>
								<PopoverArrowTip />
							</PopoverArrow>

							<Code>
								<styled.div>
									<styled.span color="fg.muted">Username:</styled.span> guest
								</styled.div>
								<styled.div>
									<styled.span color="fg.muted">Password:</styled.span> password
								</styled.div>
							</Code>
						</PopoverContent>
					</PopoverPositioner>
				</Portal>
			</Popover>
		</>
	);
}
