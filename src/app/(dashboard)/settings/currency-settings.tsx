"use client";

import {Button} from "@/components/button";
import {Icon} from "@/components/icon";
import {
	Select,
	SelectContent,
	SelectControl,
	SelectItem,
	SelectItemGroup,
	SelectItemIndicator,
	SelectItemText,
	SelectPositioner,
	SelectTrigger,
	SelectValueText,
} from "@/components/select";
import {toast} from "@/components/toaster";
import {Box, HStack} from "@/styled-system/jsx";
import {constants} from "@/utils/constants";
import {updateCurrency} from "@/utils/mutations";
import {Portal, SelectLabel} from "@ark-ui/react";
import {User} from "@prisma/client";
import {CheckIcon, ChevronsUpDownIcon} from "lucide-react";
import {useState, useTransition} from "react";

interface CurrencySettingsProps {
	__SSR_DATA: {user: User};
}

export function CurrencySettings(props: CurrencySettingsProps) {
	const [pending, startTransition] = useTransition();
	const [currency, setCurrency] = useState(props.__SSR_DATA.user.currency);

	return (
		<HStack alignItems="end">
			<Select
				items={options}
				w="8rem"
				size="sm"
				positioning={{
					placement: "bottom-start",
					sameWidth: false,
					fitViewport: true,
				}}
				value={[currency]}
				onValueChange={(details) => {
					setCurrency(details.value[0]);
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
				<Portal>
					<SelectPositioner>
						<SelectContent
							h="24.25rem"
							maxH="75vh"
							maxW="20rem"
							overflowY="auto"
						>
							<SelectItemGroup id="settings.currency">
								{options.map((option) => (
									<SelectItem
										item={option}
										key={option.value}
										h="auto"
										py={1.5}
									>
										<SelectItemText>
											<Box lineHeight="none">{option.details.abbr}</Box>
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
				</Portal>
			</Select>

			<Button
				size="sm"
				variant="outline"
				disabled={pending}
				onClick={() =>
					startTransition(async () => {
						const error = await updateCurrency(currency);

						if (error) {
							toast.error({
								title: "Error",
								description: error,
							});
						} else {
							toast.success({
								title: "Success",
								description: "Currency has been updated",
							});
						}
					})
				}
			>
				Save
			</Button>
		</HStack>
	);
}

const options = constants.currencies.map((currency) => ({
	value: currency.abbr,
	details: currency,
}));
