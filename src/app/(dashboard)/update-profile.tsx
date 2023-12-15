"use client";

import {Button} from "@/components/button";
import {
	Dialog,
	DialogBackdrop,
	DialogCloseTrigger,
	DialogContent,
	DialogPositioner,
	DialogTrigger,
} from "@/components/dialog";
import {ErrorMessage} from "@/components/error-message";
import {Icon} from "@/components/icon";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {MenuItem} from "@/components/menu";
import {toast} from "@/components/toaster";
import {Flex, HStack, VStack, styled} from "@/styled-system/jsx";
import {Portal} from "@ark-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {User} from "@prisma/client";
import {SettingsIcon} from "lucide-react";
import {useEffect, useTransition} from "react";
import {useForm} from "react-hook-form";
import {Spinner} from "../spinner";
import {updateProfile} from "./actions";
import {TUpdateProfileSchema, UpdateProfileSchema} from "./schema";

interface UpdateProfileProps {
	__SSR_DATA: {user: User};
}

export function UpdateProfile({__SSR_DATA: {user}}: UpdateProfileProps) {
	const [pending, startTransition] = useTransition();

	const form = useForm<TUpdateProfileSchema>({
		resolver: zodResolver(UpdateProfileSchema),
		defaultValues: {
			name: "",
			email: "",
		},
	});

	useEffect(() => {
		form.setValue("name", user.name);
		form.setValue("email", user.email);
	}, [form, user]);

	return (
		<Dialog
			unmountOnExit
			closeOnEscapeKeyDown={false}
			closeOnInteractOutside={false}
		>
			{(api) => (
				<>
					<DialogTrigger asChild>
						<MenuItem id="navbar.profile-settings.update-profile" gap={2}>
							<Icon>
								<SettingsIcon />
							</Icon>
							<styled.span>Account Settings</styled.span>
						</MenuItem>
					</DialogTrigger>

					<Portal>
						<DialogBackdrop />
						<DialogPositioner>
							<DialogContent>
								<styled.form
									w="25rem"
									p={8}
									onSubmit={form.handleSubmit((data) => {
										return startTransition(async () => {
											const error = await updateProfile(data);

											if (error) {
												toast.error({
													title: "Error",
													description: error,
												});

												return;
											}

											api.close();
											toast.error({
												title: "Success",
												description: "Profile has been updated",
											});
										});
									})}
								>
									<VStack alignItems="stretch" gap={3}>
										<Flex flexDir="column" gap={1.5}>
											<Label htmlFor="update-profile.name">Name</Label>
											<Input
												id="update-profile.name"
												size="lg"
												placeholder="Name"
												{...form.register("name")}
											/>
											<ErrorMessage>
												{form.formState.errors.name?.message}
											</ErrorMessage>
										</Flex>

										<Flex flexDir="column" gap={1.5}>
											<Label htmlFor="update-profile.email">Email</Label>
											<Input
												id="update-profile.email"
												size="lg"
												placeholder="Email"
												{...form.register("email")}
											/>
											<ErrorMessage>
												{form.formState.errors.email?.message}
											</ErrorMessage>
										</Flex>
										<Flex flexDir="column" gap={1.5}>
											<Label>Username</Label>
											<Input
												size="lg"
												disabled
												placeholder="Username"
												defaultValue={user.username}
											/>
										</Flex>
									</VStack>

									<HStack mt={8} gap={4}>
										<DialogCloseTrigger asChild>
											<Button
												w="full"
												size="lg"
												variant="outline"
												disabled={pending}
											>
												Cancel
											</Button>
										</DialogCloseTrigger>
										<Button w="full" size="lg" type="submit" disabled={pending}>
											{pending ? <Spinner /> : "Submit"}
										</Button>
									</HStack>
								</styled.form>
							</DialogContent>
						</DialogPositioner>
					</Portal>
				</>
			)}
		</Dialog>
	);
}
