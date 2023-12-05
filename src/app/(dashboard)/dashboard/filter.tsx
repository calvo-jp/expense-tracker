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
import {HStack} from "@/styled-system/jsx";
import {pascalToSentenceCase} from "@/utils/pascal-to-sentence-case";
import {ChevronsUpDownIcon} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useTransition} from "react";
import {Duration, DurationSchema} from "./utils";

export function Filter() {
	const router = useRouter();
	const search = useSearchParams();
	const pathname = usePathname();

	const [pending, startTransition] = useTransition();

	const {q} = DurationSchema.parse({
		q: search.get("q"),
	});

	return (
		<HStack>
			<Select
				w="9rem"
				size="lg"
				items={durationsOptions}
				value={[q]}
				onValueChange={(details) => {
					const value = details.value.at(0);

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

const durationsOptions = Object.values(Duration).map((value) => ({
	value,
	label: pascalToSentenceCase(value),
}));
