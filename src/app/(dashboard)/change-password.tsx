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
import {changePassword} from "@/utils/mutations";
import {ChangePasswordSchema, TChangePasswordSchema} from "@/utils/types";
import {Portal} from "@ark-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {LockKeyholeIcon} from "lucide-react";
import {useTransition} from "react";
import {useForm} from "react-hook-form";

export function ChangePassword() {
	const [pending, startTransition] = useTransition();

	const form = useForm<TChangePasswordSchema>({
		resolver: zodResolver(ChangePasswordSchema),
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
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
						<MenuItem id="navbar.profile-settings.change-password" gap={2}>
							<Icon>
								<LockKeyholeIcon />
							</Icon>
							<styled.span>Change Password</styled.span>
						</MenuItem>
					</DialogTrigger>

					<Portal>
						<DialogBackdrop />
						<DialogPositioner>
							<DialogContent asChild>
								<styled.form
									w="25rem"
									p={8}
									onSubmit={form.handleSubmit((data) => {
										return startTransition(async () => {
											const error = await changePassword(data);

											if (error) {
												toast.error({
													title: "Error",
													description: error,
												});

												return;
											}

											api.close();
											form.reset();
											toast.error({
												title: "Success",
												description: "Password has been updated",
											});
										});
									})}
								>
									<VStack alignItems="stretch" gap={3}>
										<Flex flexDir="column" gap={1.5}>
											<Label htmlFor="change-password.old-password">
												Old Password
											</Label>
											<Input
												id="change-password.old-password"
												size="lg"
												type="password"
												placeholder="Old Password"
												{...form.register("oldPassword")}
											/>
											<ErrorMessage>
												{form.formState.errors.oldPassword?.message}
											</ErrorMessage>
										</Flex>
										<Flex flexDir="column" gap={1.5}>
											<Label htmlFor="change-password.new-password">
												New Password
											</Label>
											<Input
												id="change-password.new-password"
												size="lg"
												type="password"
												placeholder="New Password"
												{...form.register("newPassword")}
											/>
											<ErrorMessage>
												{form.formState.errors.newPassword?.message}
											</ErrorMessage>
										</Flex>
										<Flex flexDir="column" gap={1.5}>
											<Label htmlFor="change-password.confirm-password">
												Confirm Password
											</Label>
											<Input
												id="change-password.confirm-password"
												size="lg"
												type="password"
												placeholder="Confirm Password"
												{...form.register("confirmPassword")}
											/>
											<ErrorMessage>
												{form.formState.errors.confirmPassword?.message}
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
