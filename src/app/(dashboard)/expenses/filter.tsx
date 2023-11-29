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
	DatePicker,
	DatePickerContent,
	DatePickerControl,
	DatePickerInput,
	DatePickerLabel,
	DatePickerNextTrigger,
	DatePickerPositioner,
	DatePickerPrevTrigger,
	DatePickerRangeText,
	DatePickerTable,
	DatePickerTableBody,
	DatePickerTableCell,
	DatePickerTableCellTrigger,
	DatePickerTableHead,
	DatePickerTableHeader,
	DatePickerTableRow,
	DatePickerTrigger,
	DatePickerView,
	DatePickerViewControl,
	DatePickerViewTrigger,
} from "@/components/date-picker";
import {
	Drawer,
	DrawerBackdrop,
	DrawerBody,
	DrawerCloseTrigger,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerPositioner,
	DrawerTrigger,
} from "@/components/drawer";
import {Icon} from "@/components/icon";
import {IconButton} from "@/components/icon-button";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {
	NumberInput,
	NumberInputControl,
	NumberInputDecrementTrigger,
	NumberInputIncrementTrigger,
	NumberInputInput,
	NumberInputLabel,
} from "@/components/number-input";
import {Box, Flex, HStack} from "@/styled-system/jsx";
import {pascalToSentenceCase} from "@/utils/pascal-to-sentence-case";
import {ExpenseFilterSchema, TExpenseFilterSchema} from "@/utils/types";
import {Portal} from "@ark-ui/react";
import {ExpenseCategory} from "@prisma/client";
import {format} from "date-fns";
import {
	CalendarIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
	ChevronsUpDownIcon,
	SearchIcon,
} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useReducer, useTransition} from "react";

export function Filter() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [pending, startTransition] = useTransition();

	const [value, setValue] = useReducer(
		(
			prev: Partial<TExpenseFilterSchema>,
			next: Partial<TExpenseFilterSchema>,
		) => {
			return {
				...prev,
				...next,
			};
		},
		ExpenseFilterSchema.parse({
			category: searchParams.getAll("category"),
			location: searchParams.get("location"),
			minAmount: searchParams.get("minAmount"),
			maxAmount: searchParams.get("maxAmount"),
			transactionDateStart: searchParams.get("transactionDateStart"),
			transactionDateUntil: searchParams.get("transactionDateUntil"),
		}),
	);

	const applyFilter = () => {
		const s = new URLSearchParams(searchParams);

		/* reset page */
		s.set("page", "1");

		s.delete("category");
		s.delete("location");
		s.delete("minAmount");
		s.delete("maxAmount");
		s.delete("maxAmount");
		s.delete("transactionDateStart");
		s.delete("transactionDateUntil");

		if (value.category) {
			for (const item of value.category) {
				s.append("category", item);
			}
		}

		if (value.location) {
			s.set("location", value.location);
		}

		if (value.maxAmount) {
			s.set("maxAmount", value.maxAmount.toString());
		}

		if (value.minAmount) {
			s.set("minAmount", value.minAmount.toString());
		}

		if (value.transactionDateStart) {
			s.set(
				"transactionDateStart",
				format(value.transactionDateStart, "yyyy-MM-dd"),
			);
		}

		if (value.transactionDateUntil) {
			s.set(
				"transactionDateUntil",
				format(value.transactionDateUntil, "yyyy-MM-dd"),
			);
		}

		router.push(`${pathname}?${s.toString()}`);
	};

	const resetFilter = () => {
		const s = new URLSearchParams();

		const page = searchParams.get("page");
		const size = searchParams.get("size");

		page && s.set("page", page);
		size && s.set("size", size);

		router.push(`${pathname}?${s.toString()}`);
	};

	return (
		<Drawer unmountOnExit>
			{(api) => (
				<>
					<DrawerTrigger asChild>
						<IconButton variant="outline">
							<Icon>
								<SearchIcon />
							</Icon>
						</IconButton>
					</DrawerTrigger>
					<Portal>
						<DrawerBackdrop />
						<DrawerPositioner w="token(sizes.xs)">
							<DrawerContent>
								<DrawerHeader p={0}>
									<Flex h="navbar.height" pr={4} pl={6} alignItems="center">
										<DrawerCloseTrigger asChild>
											<IconButton variant="outline">
												<Icon>
													<ChevronRightIcon />
												</Icon>
											</IconButton>
										</DrawerCloseTrigger>
									</Flex>
								</DrawerHeader>

								<DrawerBody>
									<Combobox
										items={categories}
										value={value.category ?? []}
										onValueChange={(d) => {
											setValue({category: d.value as ExpenseCategory[]});
										}}
									>
										{(api) => (
											<>
												<ComboboxLabel>Category</ComboboxLabel>
												<ComboboxControl>
													<ComboboxInput placeholder="Choose category" asChild>
														<Input />
													</ComboboxInput>
													<ComboboxTrigger asChild>
														<IconButton variant="link" aria-label="open">
															<Icon>
																<ChevronsUpDownIcon />
															</Icon>
														</IconButton>
													</ComboboxTrigger>
												</ComboboxControl>
												<ComboboxPositioner>
													<ComboboxContent>
														<ComboboxItemGroup id="expenses.filter.category.items">
															{categories
																.slice()
																.filter(({label}) => {
																	return label
																		.toLowerCase()
																		.startsWith(
																			api.inputValue.toLowerCase().trim(),
																		);
																})
																.map((item) => (
																	<ComboboxItem key={item.value} item={item}>
																		<ComboboxItemText>
																			{item.label}
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

									<Box mt={4}>
										<Label htmlFor="expenses.filter.location">Location</Label>
										<Input
											mt={1}
											id="expenses.filter.location"
											value={value.location ?? ""}
											onChange={(e) => {
												setValue({location: e.target.value});
											}}
											placeholder="Enter location"
										/>
									</Box>

									<DatePicker
										mt={4}
										startOfWeek={1}
										selectionMode="range"
										positioning={{
											placement: "bottom-end",
										}}
										value={
											[
												value.transactionDateStart
													? format(value.transactionDateStart, "yyyy-MM-dd")
													: null,
												value.transactionDateUntil
													? format(value.transactionDateUntil, "yyyy-MM-dd")
													: null,
											].filter(Boolean) as string[]
										}
										onValueChange={(d) => {
											if (d.value.length === 2) {
												setValue({
													transactionDateStart: d.value[0].toDate("utc"),
													transactionDateUntil: d.value[1].toDate("utc"),
												});
											}

											if (d.value.length === 1) {
												setValue({
													transactionDateStart: d.value[0].toDate("utc"),
												});
											}
										}}
									>
										<DatePickerLabel>Transaction date</DatePickerLabel>
										<DatePickerControl>
											<DatePickerInput asChild>
												<Input placeholder="Choose date" />
											</DatePickerInput>
											<DatePickerTrigger asChild>
												<IconButton
													variant="outline"
													aria-label="Open date picker"
												>
													<Icon>
														<CalendarIcon />
													</Icon>
												</IconButton>
											</DatePickerTrigger>
										</DatePickerControl>
										<DatePickerPositioner>
											<DatePickerContent>
												<DatePickerView view="day">
													{(api) => (
														<>
															<DatePickerViewControl>
																<DatePickerPrevTrigger asChild>
																	<IconButton variant="ghost" size="sm">
																		<Icon>
																			<ChevronLeftIcon />
																		</Icon>
																	</IconButton>
																</DatePickerPrevTrigger>
																<DatePickerViewTrigger asChild>
																	<Button variant="ghost" size="sm">
																		<DatePickerRangeText />
																	</Button>
																</DatePickerViewTrigger>
																<DatePickerNextTrigger asChild>
																	<IconButton variant="ghost" size="sm">
																		<Icon>
																			<ChevronRightIcon />
																		</Icon>
																	</IconButton>
																</DatePickerNextTrigger>
															</DatePickerViewControl>
															<DatePickerTable>
																<DatePickerTableHead>
																	<DatePickerTableRow>
																		{api.weekDays.map((weekDay, id) => (
																			<DatePickerTableHeader key={id}>
																				{weekDay.narrow}
																			</DatePickerTableHeader>
																		))}
																	</DatePickerTableRow>
																</DatePickerTableHead>
																<DatePickerTableBody>
																	{api.weeks.map((week, id) => (
																		<DatePickerTableRow key={id}>
																			{week.map((day, id) => (
																				<DatePickerTableCell
																					key={id}
																					value={day}
																				>
																					<DatePickerTableCellTrigger asChild>
																						<IconButton variant="ghost">
																							{day.day}
																						</IconButton>
																					</DatePickerTableCellTrigger>
																				</DatePickerTableCell>
																			))}
																		</DatePickerTableRow>
																	))}
																</DatePickerTableBody>
															</DatePickerTable>
														</>
													)}
												</DatePickerView>
												<DatePickerView view="month">
													{(api) => (
														<>
															<DatePickerViewControl>
																<DatePickerPrevTrigger asChild>
																	<IconButton variant="ghost" size="sm">
																		<Icon>
																			<ChevronLeftIcon />
																		</Icon>
																	</IconButton>
																</DatePickerPrevTrigger>
																<DatePickerViewTrigger asChild>
																	<Button variant="ghost" size="sm">
																		<DatePickerRangeText />
																	</Button>
																</DatePickerViewTrigger>
																<DatePickerNextTrigger asChild>
																	<IconButton variant="ghost" size="sm">
																		<Icon>
																			<ChevronRightIcon />
																		</Icon>
																	</IconButton>
																</DatePickerNextTrigger>
															</DatePickerViewControl>
															<DatePickerTable>
																<DatePickerTableBody>
																	{api
																		.getMonthsGrid({
																			columns: 4,
																			format: "short",
																		})
																		.map((months, id) => (
																			<DatePickerTableRow key={id}>
																				{months.map((month, id) => (
																					<DatePickerTableCell
																						key={id}
																						value={month.value}
																					>
																						<DatePickerTableCellTrigger asChild>
																							<Button variant="ghost">
																								{month.label}
																							</Button>
																						</DatePickerTableCellTrigger>
																					</DatePickerTableCell>
																				))}
																			</DatePickerTableRow>
																		))}
																</DatePickerTableBody>
															</DatePickerTable>
														</>
													)}
												</DatePickerView>
												<DatePickerView view="year">
													{(api) => (
														<>
															<DatePickerViewControl>
																<DatePickerPrevTrigger asChild>
																	<IconButton variant="ghost" size="sm">
																		<Icon>
																			<ChevronLeftIcon />
																		</Icon>
																	</IconButton>
																</DatePickerPrevTrigger>
																<DatePickerViewTrigger asChild>
																	<Button variant="ghost" size="sm">
																		<DatePickerRangeText />
																	</Button>
																</DatePickerViewTrigger>
																<DatePickerNextTrigger asChild>
																	<IconButton variant="ghost" size="sm">
																		<Icon>
																			<ChevronRightIcon />
																		</Icon>
																	</IconButton>
																</DatePickerNextTrigger>
															</DatePickerViewControl>
															<DatePickerTable>
																<DatePickerTableBody>
																	{api
																		.getYearsGrid({columns: 4})
																		.map((years, id) => (
																			<DatePickerTableRow key={id}>
																				{years.map((year, id) => (
																					<DatePickerTableCell
																						key={id}
																						value={year.value}
																					>
																						<DatePickerTableCellTrigger asChild>
																							<Button variant="ghost">
																								{year.label}
																							</Button>
																						</DatePickerTableCellTrigger>
																					</DatePickerTableCell>
																				))}
																			</DatePickerTableRow>
																		))}
																</DatePickerTableBody>
															</DatePickerTable>
														</>
													)}
												</DatePickerView>
											</DatePickerContent>
										</DatePickerPositioner>
									</DatePicker>

									<HStack mt={4} alignItems="end" gap={4}>
										<NumberInput
											min={0}
											value={value.minAmount?.toString() ?? ""}
											onValueChange={(d) => {
												setValue({minAmount: d.valueAsNumber});
											}}
										>
											<NumberInputLabel>Amount</NumberInputLabel>
											<NumberInputControl>
												<NumberInputInput placeholder="Min" />
												<NumberInputIncrementTrigger>
													<Icon size="sm">
														<ChevronUpIcon />
													</Icon>
												</NumberInputIncrementTrigger>
												<NumberInputDecrementTrigger>
													<Icon size="sm">
														<ChevronDownIcon />
													</Icon>
												</NumberInputDecrementTrigger>
											</NumberInputControl>
										</NumberInput>

										<NumberInput
											min={0}
											value={value.maxAmount?.toString() ?? ""}
											onValueChange={(d) => {
												setValue({maxAmount: d.valueAsNumber});
											}}
										>
											<NumberInputControl>
												<NumberInputInput placeholder="Max" />
												<NumberInputIncrementTrigger>
													<Icon size="sm">
														<ChevronUpIcon />
													</Icon>
												</NumberInputIncrementTrigger>
												<NumberInputDecrementTrigger>
													<Icon size="sm">
														<ChevronDownIcon />
													</Icon>
												</NumberInputDecrementTrigger>
											</NumberInputControl>
										</NumberInput>
									</HStack>
								</DrawerBody>

								<DrawerFooter gap="3" justifyContent="start">
									<Button
										w="full"
										variant="outline"
										disabled={pending}
										onClick={() => {
											api.close();
											startTransition(resetFilter);
										}}
									>
										Reset
									</Button>
									<Button
										w="full"
										disabled={pending}
										onClick={() => {
											api.close();
											startTransition(applyFilter);
										}}
									>
										Apply
									</Button>
								</DrawerFooter>
							</DrawerContent>
						</DrawerPositioner>
					</Portal>
				</>
			)}
		</Drawer>
	);
}

const categories = Object.values(ExpenseCategory).map((category) => ({
	label: pascalToSentenceCase(category),
	value: category,
}));
