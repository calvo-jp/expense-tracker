"use client";

import {Spinner} from "@/app/spinner";
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
import {Box, HStack} from "@/styled-system/jsx";
import {format} from "date-fns";
import {ChevronsUpDownIcon} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useTransition} from "react";
import {DateRange, Duration, getDurationValue} from "./utils";

interface FilterProps {
	__SSR_DATA: {
		duration: Duration;
	};
}

export function Filter(props: FilterProps) {
	const router = useRouter();
	const search = useSearchParams();
	const pathname = usePathname();

	const [pending, startTransition] = useTransition();

	return (
		<HStack>
			<Select
				w="9rem"
				size="lg"
				items={durationsOptions}
				defaultValue={[props.__SSR_DATA.duration]}
				onValueChange={(details) => {
					const value = details.value.at(0);

					if (value === props.__SSR_DATA.duration) return;
					if (value) {
						const s = new URLSearchParams(search);

						s.delete("q");
						s.set("q", value);

						startTransition(() => {
							router.push(`${pathname}?${s.toString()}`);
						});
					}
				}}
				disabled={pending}
				positioning={{
					placement: "bottom-end",
					sameWidth: false,
				}}
			>
				<SelectControl>
					<SelectTrigger>
						<SelectValueText />
						<Icon>{pending ? <Spinner /> : <ChevronsUpDownIcon />}</Icon>
					</SelectTrigger>
				</SelectControl>
				<SelectPositioner>
					<SelectContent>
						<SelectItemGroup id="x">
							{durationsOptions.map((option) => (
								<SelectItem
									key={option.value}
									item={option}
									h="auto"
									display="flex"
									alignItems="start"
									flexDir="column"
								>
									<Box>{option.label}</Box>
									<Box color="fg.muted" fontSize="xs">
										{formatRange(option.range)}
									</Box>
								</SelectItem>
							))}
						</SelectItemGroup>
					</SelectContent>
				</SelectPositioner>
			</Select>
		</HStack>
	);
}

function formatRange(value: DateRange) {
	const s = format(value.start, "MM/dd/yyyy");
	const u = format(value.until, "MM/dd/yyyy");

	return `${s} - ${u}`;
}

const durationsOptions = [
	{
		label: "This Year",
		value: Duration.ThisYear,
		range: getDurationValue(Duration.ThisYear),
	},
	{
		label: "Last Year",
		value: Duration.LastYear,
		range: getDurationValue(Duration.LastYear),
	},
	{
		label: "This Month",
		value: Duration.ThisMonth,
		range: getDurationValue(Duration.ThisMonth),
	},
	{
		label: "Last Month",
		value: Duration.LastMonth,
		range: getDurationValue(Duration.LastMonth),
	},
	{
		label: "This Week",
		value: Duration.ThisWeek,
		range: getDurationValue(Duration.ThisWeek),
	},
	{
		label: "Last Week",
		value: Duration.LastWeek,
		range: getDurationValue(Duration.LastWeek),
	},
];
