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
import {FormErrorMessage} from "@/components/form-error-message";
import {FormLabel} from "@/components/form-label";
import {Icon} from "@/components/icon";
import {Input} from "@/components/input";
import {MenuItem} from "@/components/menu";
import {toast} from "@/components/toaster";
import {Flex, HStack, VStack, styled} from "@/styled-system/jsx";
import {Portal} from "@ark-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {User} from "@prisma/client";
import {SettingsIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {Spinner} from "../spinner";
import {updateProfile} from "./actions";
import {TUpdateProfileSchema, UpdateProfileSchema} from "./schema";

interface UpdateProfileProps {
	__SSR_DATA: {
		user: User;
	};
}

export function UpdateProfile(props: UpdateProfileProps) {
	const form = useForm<TUpdateProfileSchema>({
		resolver: zodResolver(UpdateProfileSchema),
		defaultValues: {
			name: props.__SSR_DATA.user.name,
			email: props.__SSR_DATA.user.email,
		},
	});

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
									onSubmit={form.handleSubmit(async (data) => {
										const error = await updateProfile(data);

										if (error) {
											toast.error({
												title: "Error",
												description: error,
											});

											return;
										}

										api.close();
										toast.success({
											title: "Success",
											description: "Profile has been updated",
										});
									})}
								>
									<VStack alignItems="stretch" gap={3}>
										<Flex flexDir="column" gap={1.5}>
											<FormLabel htmlFor="update-profile.name">Name</FormLabel>
											<Input
												id="update-profile.name"
												size="lg"
												placeholder="Name"
												{...form.register("name")}
											/>
											<FormErrorMessage>
												{form.formState.errors.name?.message}
											</FormErrorMessage>
										</Flex>

										<Flex flexDir="column" gap={1.5}>
											<FormLabel htmlFor="update-profile.email">
												Email
											</FormLabel>
											<Input
												id="update-profile.email"
												size="lg"
												type="email"
												placeholder="Email"
												{...form.register("email")}
											/>
										</Flex>
									</VStack>

									<HStack mt={8} gap={4}>
										<DialogCloseTrigger asChild>
											<Button
												w="full"
												size="lg"
												variant="outline"
												disabled={form.formState.isSubmitting}
											>
												Cancel
											</Button>
										</DialogCloseTrigger>
										<Button
											w="full"
											size="lg"
											type="submit"
											disabled={form.formState.isSubmitting}
										>
											{form.formState.isSubmitting ? <Spinner /> : "Submit"}
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
