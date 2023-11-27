"use client";

import {Avatar, AvatarFallback} from "@/components/avatar";
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
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {MenuItem} from "@/components/menu";
import {toast} from "@/components/toaster";
import {Box, Flex, HStack, VStack, styled} from "@/styled-system/jsx";
import {getInitials} from "@/utils/get-initials";
import {updateProfile} from "@/utils/mutations";
import {TUpdateProfileSchema, UpdateProfileSchema} from "@/utils/types";
import {Portal} from "@ark-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {User} from "@prisma/client";
import {useEffect, useTransition} from "react";
import {useForm} from "react-hook-form";

interface UpdateProfileProps {
	__SSR_DATA: {user: User};
}

export function UpdateProfile({__SSR_DATA: {user}}: UpdateProfileProps) {
	const [pending, startTransition] = useTransition();

	const form = useForm<TUpdateProfileSchema>({
		resolver: zodResolver(UpdateProfileSchema),
		values: {
			name: "",
			email: "",
		},
	});

	useEffect(() => {
		user.name && form.setValue("name", user.name);
		user.email && form.setValue("email", user.email);
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
						<MenuItem
							id="navbar.profile-settings.update-profile"
							h="auto"
							py={2}
						>
							<HStack>
								<Avatar>
									<AvatarFallback>
										{getInitials(user.name ?? user.username)}
									</AvatarFallback>
								</Avatar>

								<Box lineHeight="none">
									<styled.div fontSize="md" fontWeight="bold">
										{user.name ?? "unnamed"}
									</styled.div>
									<styled.div mt={0.5} color="fg.muted">
										@{user.username}
									</styled.div>
								</Box>
							</HStack>
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
												placeholder="Email"
												{...form.register("email")}
											/>
											<ErrorMessage>
												{form.formState.errors.email?.message}
											</ErrorMessage>
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
											Submit
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
