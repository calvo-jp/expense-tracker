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
import {Icon} from "@/components/icon";
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
import {Flex, HStack, styled} from "@/styled-system/jsx";
import {Portal} from "@ark-ui/react";
import {
	CheckIcon,
	ChevronsUpDownIcon,
	Laptop2Icon,
	MoonIcon,
	PaletteIcon,
	SunIcon,
} from "lucide-react";
import {useTheme} from "next-themes";
import {useEffect, useState, useTransition} from "react";
import {Spinner} from "../spinner";

export function ThemeSettings() {
	const globalTheme = useTheme();

	const [theme, setTheme] = useState("system");
	const [pending, startTransition] = useTransition();

	useEffect(() => {
		setTheme(globalTheme.theme ?? "system");
	}, [globalTheme.theme]);

	return (
		<Dialog
			unmountOnExit
			closeOnEscapeKeyDown={false}
			closeOnInteractOutside={false}
		>
			{(modalContext) => (
				<>
					<DialogTrigger asChild>
						<MenuItem id="navbar.profile-settings.theme" gap={2}>
							<Icon>
								<PaletteIcon />
							</Icon>
							<styled.span>Theme Settings</styled.span>
						</MenuItem>
					</DialogTrigger>

					<Portal>
						<DialogBackdrop />
						<DialogPositioner>
							<DialogContent asChild>
								<styled.form p={8} w="25rem">
									<Select
										size="lg"
										items={themes}
										value={[theme]}
										onValueChange={(details) => {
											if (details.value.length) {
												setTheme(details.value[0]);
											}
										}}
									>
										{(api) => {
											const v = api.selectedItems.at(0) as {[key: string]: any};

											return (
												<>
													<SelectLabel>Theme</SelectLabel>
													<SelectControl>
														<SelectTrigger>
															<SelectValueText asChild>
																{v && (
																	<Flex gap={2} alignItems="center">
																		<Icon color="fg.default">{v.icon}</Icon>
																		<styled.span>{v.label}</styled.span>
																	</Flex>
																)}
															</SelectValueText>
															<Icon>
																<ChevronsUpDownIcon />
															</Icon>
														</SelectTrigger>
													</SelectControl>
													<SelectPositioner>
														<SelectContent>
															<SelectItemGroup id="expenses-pagination-page-size">
																{themes.map((theme) => (
																	<SelectItem key={theme.value} item={theme}>
																		<SelectItemText>
																			<Flex gap={2} alignItems="center">
																				<Icon>{theme.icon}</Icon>
																				<styled.span>{theme.label}</styled.span>
																			</Flex>
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
												</>
											);
										}}
									</Select>

									<HStack mt={8} gap={4}>
										<DialogCloseTrigger asChild>
											<Button w="full" size="lg" variant="outline">
												Cancel
											</Button>
										</DialogCloseTrigger>
										<Button
											w="full"
											size="lg"
											type="submit"
											disabled={pending}
											onClick={() => {
												modalContext.close();

												startTransition(() => {
													globalTheme.setTheme(theme);
												});
											}}
										>
											{pending ? <Spinner /> : "Apply"}
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

const themes = [
	{
		value: "light",
		label: "Light",
		icon: <SunIcon />,
	},
	{
		value: "dark",
		label: "Dark",
		icon: <MoonIcon />,
	},
	{
		value: "system",
		label: "System",
		icon: <Laptop2Icon />,
	},
];
