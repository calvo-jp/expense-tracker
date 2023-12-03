"use client";

import {Icon} from "@/components/icon";
import {
	Select,
	SelectContent,
	SelectControl,
	SelectItem,
	SelectItemGroup,
	SelectPositioner,
	SelectTrigger,
	SelectValueText,
} from "@/components/select";
import {HStack} from "@/styled-system/jsx";
import {ChevronsUpDownIcon} from "lucide-react";

export function Filter() {
	return (
		<HStack>
			<Select
				w="9rem"
				size="lg"
				items={durationsOptions}
				defaultValue={[durationsOptions[0].value]}
			>
				<SelectControl>
					<SelectTrigger>
						<SelectValueText />
						<Icon>
							<ChevronsUpDownIcon />
						</Icon>
					</SelectTrigger>
				</SelectControl>
				<SelectPositioner>
					<SelectContent>
						<SelectItemGroup id="x">
							{durationsOptions.map((option) => (
								<SelectItem key={option.value} item={option}>
									{option.label}
								</SelectItem>
							))}
						</SelectItemGroup>
					</SelectContent>
				</SelectPositioner>
			</Select>
		</HStack>
	);
}

const durations = [
	"This Year",
	"Last Year",
	"This Month",
	"Last Month",
	"This Week",
	"Last Week",
];

const durationsOptions = durations.map((value) => ({
	value,
	label: value,
}));
