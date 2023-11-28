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
import {Icon} from "@/components/icon";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {MenuItem} from "@/components/menu";
import {
	Select,
	SelectContent,
	SelectControl,
	SelectItem,
	SelectItemGroup,
	SelectItemIndicator,
	SelectItemText,
	SelectLabel,
	SelectPositioner,
	SelectTrigger,
	SelectValueText,
} from "@/components/select";
import {toast} from "@/components/toaster";
import {Box, Flex, HStack, VStack, styled} from "@/styled-system/jsx";
import {constants} from "@/utils/constants";
import {getInitials} from "@/utils/get-initials";
import {updateProfile} from "@/utils/mutations";
import {TUpdateProfileSchema, UpdateProfileSchema} from "@/utils/types";
import {Portal} from "@ark-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {User} from "@prisma/client";
import {CheckIcon, ChevronsUpDownIcon} from "lucide-react";
import {useEffect, useTransition} from "react";
import {useForm} from "react-hook-form";

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
			currency: "",
		},
	});

	useEffect(() => {
		form.setValue("name", user.name);
		form.setValue("email", user.email);
		form.setValue("currency", user.currency);
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
											<Select
												size="lg"
												items={CURRENCIES}
												value={[form.watch("currency")]}
												onValueChange={(details) => {
													form.setValue("currency", details.value[0]);
												}}
											>
												<SelectLabel>Currency</SelectLabel>
												<SelectControl>
													<SelectTrigger>
														<SelectValueText />
														<Icon>
															<ChevronsUpDownIcon />
														</Icon>
													</SelectTrigger>
												</SelectControl>
												<SelectPositioner>
													<SelectContent h="12rem" overflowY="auto">
														<SelectItemGroup id="settings.currency">
															{CURRENCIES.map((option) => (
																<SelectItem
																	item={option}
																	key={option.value}
																	h="auto"
																	py={1.5}
																>
																	<SelectItemText>
																		<Box lineHeight="none">
																			{option.details.abbr}
																		</Box>
																		<Box
																			mt={1}
																			color="fg.muted"
																			fontSize="xs"
																			lineHeight="none"
																		>
																			{option.details.name}
																		</Box>
																	</SelectItemText>
																	<SelectItemIndicator>
																		<Icon>
																			<CheckIcon />
																		</Icon>
																	</SelectItemIndicator>
																</SelectItem>
															))}
														</SelectItemGroup>
													</SelectContent>
												</SelectPositioner>
											</Select>
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

const CURRENCIES = constants.currencies.map((currency) => ({
	value: currency.abbr,
	details: currency,
}));
