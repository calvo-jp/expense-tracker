"use client";

import {Button} from "@/components/button";
import {
	Combobox,
	ComboboxContent,
	ComboboxControl,
	ComboboxInput,
	ComboboxItem,
	ComboboxItemGroup,
	ComboboxItemIndicator,
	ComboboxItemText,
	ComboboxLabel,
	ComboboxPositioner,
	ComboboxTrigger,
} from "@/components/combobox";
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
import {IconButton} from "@/components/icon-button";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {MenuItem} from "@/components/menu";
import {toast} from "@/components/toaster";
import {Box, Flex, HStack, VStack, styled} from "@/styled-system/jsx";
import {constants} from "@/utils/constants";
import {updateProfile} from "@/utils/mutations";
import {TUpdateProfileSchema, UpdateProfileSchema} from "@/utils/types";
import {Portal} from "@ark-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {User} from "@prisma/client";
import {CheckIcon, ChevronsUpDownIcon, SettingsIcon} from "lucide-react";
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
										<Flex flexDir="column" gap={1.5}>
											<Combobox
												items={currencies}
												value={[form.watch("currency")]}
												onValueChange={(details) => {
													form.setValue("currency", details.value[0], {
														shouldValidate: true,
													});
												}}
											>
												{(api) => (
													<>
														<ComboboxLabel>Currency</ComboboxLabel>
														<ComboboxControl>
															<ComboboxInput asChild>
																<Input
																	size="lg"
																	placeholder="Choose currency"
																/>
															</ComboboxInput>
															<ComboboxTrigger asChild>
																<IconButton variant="link" aria-label="open">
																	<Icon>
																		<ChevronsUpDownIcon />
																	</Icon>
																</IconButton>
															</ComboboxTrigger>
														</ComboboxControl>

														<ErrorMessage>
															{form.formState.errors.currency?.message}
														</ErrorMessage>

														<ComboboxPositioner>
															<ComboboxContent maxH="12rem" overflowY="auto">
																<ComboboxItemGroup id="update-profile.currency.items">
																	{currencies
																		.filter(
																			({details}) =>
																				details.name
																					.toLowerCase()
																					.startsWith(
																						api.inputValue.toLowerCase().trim(),
																					) ||
																				details.abbr
																					.toLowerCase()
																					.startsWith(
																						api.inputValue.toLowerCase().trim(),
																					),
																		)
																		.map((item) => (
																			<ComboboxItem
																				key={item.value}
																				item={item}
																				h="auto"
																			>
																				<ComboboxItemText py={1.5}>
																					<Box lineHeight="none">
																						{item.details.abbr}
																					</Box>
																					<Box
																						mt={1}
																						color="fg.muted"
																						fontSize="sm"
																						lineHeight="none"
																					>
																						{item.details.name}
																					</Box>
																				</ComboboxItemText>
																				<ComboboxItemIndicator>
																					<Icon>
																						<CheckIcon />
																					</Icon>
																				</ComboboxItemIndicator>
																			</ComboboxItem>
																		))}
																</ComboboxItemGroup>
															</ComboboxContent>
														</ComboboxPositioner>
													</>
												)}
											</Combobox>

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

const currencies = constants.currencies.map((currency) => ({
	value: currency.abbr,
	details: currency,
}));
