"use client";

import {Spinner} from "@/app/spinner";
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
import {
	NumberInput,
	NumberInputControl,
	NumberInputDecrementTrigger,
	NumberInputIncrementTrigger,
	NumberInputInput,
	NumberInputLabel,
} from "@/components/number-input";
import {Textarea} from "@/components/textarea";
import {toast} from "@/components/toaster";
import {Flex, HStack, VStack, styled} from "@/styled-system/jsx";
import {getCurrentLocation} from "@/utils/get-current-location";
import {pascalToSentenceCase} from "@/utils/pascal-to-sentence-case";
import {stringToPrismaEnum} from "@/utils/string-to-prisma-enum";
import {Portal} from "@ark-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Expense, ExpenseCategory} from "@prisma/client";
import {format} from "date-fns";
import {
	CalendarIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
	ChevronsUpDownIcon,
} from "lucide-react";
import {ReactNode, useEffect, useTransition} from "react";
import {useForm} from "react-hook-form";
import {createExpense, updateExpense} from "./actions";
import {TUpsertExpenseSchema, UpsertExpenseSchema} from "./schema";

type UpsertExpenseProps = (
	| {
			type: "create";
	  }
	| {
			type: "update";
			data: Expense;
	  }
) & {
	children: ReactNode;
};

export function UpsertExpense(props: UpsertExpenseProps) {
	const [pending, startTransition] = useTransition();

	const form = useForm<TUpsertExpenseSchema>({
		resolver: zodResolver(UpsertExpenseSchema),
		defaultValues: {
			amount: 100,
			category: ExpenseCategory.Others,
			location: "",
			description: "",
			transactionDate: new Date(),
		},
	});

	useEffect(() => {
		if (props.type === "create") {
			getCurrentLocation().then((location) => {
				form.setValue("location", location);
			});
		}
	}, [form, props.type]);

	useEffect(() => {
		if (props.type === "update") {
			form.setValue("amount", props.data.amount);
			form.setValue("category", props.data.category);
			form.setValue("description", props.data.description);
			form.setValue("transactionDate", props.data.transactionDate);

			if (props.data.location) {
				form.setValue("location", props.data.location);
			} else {
				getCurrentLocation().then((location) => {
					form.setValue("location", location);
				});
			}
		}
	}, [form, props]);

	return (
		<Dialog
			unmountOnExit
			closeOnEscapeKeyDown={false}
			closeOnInteractOutside={false}
		>
			{(api) => (
				<>
					<DialogTrigger asChild>{props.children}</DialogTrigger>

					<Portal>
						<DialogBackdrop />
						<DialogPositioner>
							<DialogContent w="28rem" p={8}>
								<styled.form
									onSubmit={form.handleSubmit((data) => {
										return startTransition(async () => {
											const error =
												props.type === "update"
													? await updateExpense(props.data.id, data)
													: await createExpense(data);

											if (error) {
												toast.error({
													title: "Error",
													description: error,
												});

												return;
											}

											api.close();
											form.reset();
											toast.success({
												title: "Success",
												description:
													props.type === "update"
														? "Record has been updated"
														: "New record has been added",
											});
										});
									})}
								>
									<VStack gap={3} alignItems="stretch">
										<Combobox
											items={categories}
											value={[form.watch("category")]}
											onValueChange={(details) => {
												form.setValue(
													"category",
													stringToPrismaEnum(
														ExpenseCategory,
														details.value.at(0),
													) ?? ExpenseCategory.Others,
													{shouldValidate: true},
												);
											}}
										>
											{(api) => (
												<>
													<ComboboxLabel>Category</ComboboxLabel>
													<ComboboxControl>
														<ComboboxInput asChild>
															<Input size="lg" placeholder="Choose category" />
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
														{form.formState.errors.category?.message}
													</ErrorMessage>

													<ComboboxPositioner>
														<ComboboxContent>
															<ComboboxItemGroup id="expenses.upsert.category.items">
																{categories
																	.filter(({label}) =>
																		label
																			.toLowerCase()
																			.startsWith(
																				api.inputValue.toLowerCase().trim(),
																			),
																	)
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

										<Flex direction="column" gap={1.5}>
											<Label htmlFor="expenses.upsert.description">
												Description
											</Label>
											<Textarea
												id="expenses.upsert.description"
												size="lg"
												rows={3}
												resize="none"
												placeholder="Enter description"
												{...form.register("description")}
											/>
											<ErrorMessage>
												{form.formState.errors.description?.message}
											</ErrorMessage>
										</Flex>

										<Flex direction="column" gap={1.5}>
											<Label htmlFor="expenses.upsert.location">Location</Label>
											<Input
												id="expenses.upsert.location"
												size="lg"
												placeholder="Enter location"
												{...form.register("location")}
											/>
											<ErrorMessage>
												{form.formState.errors.location?.message}
											</ErrorMessage>
										</Flex>

										<DatePicker
											startOfWeek={1}
											selectionMode="single"
											positioning={{
												placement: "bottom-end",
											}}
											value={
												form.watch("transactionDate")
													? [
															format(
																form.watch("transactionDate"),
																"yyyy-MM-dd",
															),
														]
													: undefined
											}
											onValueChange={(details) => {
												form.setValue(
													"transactionDate",
													details.value.at(0)?.toDate("utc") ?? new Date(),
													{shouldValidate: true},
												);
											}}
										>
											<DatePickerLabel>Transaction date</DatePickerLabel>
											<DatePickerControl>
												<DatePickerInput asChild>
													<Input size="lg" placeholder="Choose date" />
												</DatePickerInput>
												<DatePickerTrigger asChild>
													<IconButton
														size="lg"
														variant="outline"
														aria-label="Open date picker"
													>
														<Icon>
															<CalendarIcon />
														</Icon>
													</IconButton>
												</DatePickerTrigger>
											</DatePickerControl>

											<ErrorMessage>
												{form.formState.errors.transactionDate?.message}
											</ErrorMessage>

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
																							<DatePickerTableCellTrigger
																								asChild
																							>
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
																							<DatePickerTableCellTrigger
																								asChild
																							>
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

										<NumberInput
											size="lg"
											value={form.watch("amount", 0).toString()}
											onValueChange={(details) => {
												form.setValue("amount", details.valueAsNumber, {
													shouldValidate: true,
												});
											}}
										>
											<NumberInputLabel>Amount</NumberInputLabel>
											<NumberInputControl>
												<NumberInputInput placeholder="Enter amount" />
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

											<ErrorMessage>
												{form.formState.errors.amount?.message}
											</ErrorMessage>
										</NumberInput>
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
											{pending ? <Spinner /> : "Submit"}
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

const categories = Object.values(ExpenseCategory).map((category) => ({
	label: pascalToSentenceCase(category),
	value: category,
}));
