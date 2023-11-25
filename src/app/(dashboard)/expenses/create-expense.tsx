'use client';

import {Button} from '@/components/button';
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
} from '@/components/combobox';
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
} from '@/components/date-picker';
import {
	Dialog,
	DialogBackdrop,
	DialogCloseTrigger,
	DialogContent,
	DialogPositioner,
	DialogTrigger,
} from '@/components/dialog';
import {Icon} from '@/components/icon';
import {IconButton} from '@/components/icon-button';
import {Input} from '@/components/input';
import {Label} from '@/components/label';
import {
	NumberInput,
	NumberInputControl,
	NumberInputDecrementTrigger,
	NumberInputIncrementTrigger,
	NumberInputInput,
	NumberInputLabel,
} from '@/components/number-input';
import {Textarea} from '@/components/textarea';
import {Flex, HStack, VStack, styled} from '@/styled-system/jsx';
import {Portal} from '@ark-ui/react';
import {ExpenseCategory} from '@prisma/client';
import {
	CalendarIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
	ChevronsUpDownIcon,
	PlusIcon,
} from 'lucide-react';
import {useFormState, useFormStatus} from 'react-dom';
import {createExpense} from './actions';

export function CreateExpense() {
	const [error, action] = useFormState(createExpense, null);

	return (
		<Dialog
			lazyMount
			unmountOnExit
			closeOnEscapeKeyDown={false}
			closeOnInteractOutside={false}
		>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Icon>
						<PlusIcon />
					</Icon>
					Add new
				</Button>
			</DialogTrigger>

			<Portal>
				<DialogBackdrop />
				<DialogPositioner overflowY="auto">
					<DialogContent w="28rem" p={8} asChild>
						<styled.form action={action}>
							<VStack gap={3} alignItems="stretch">
								<Combobox items={categories}>
									{() => (
										<>
											<ComboboxLabel>Category</ComboboxLabel>
											<ComboboxControl>
												<ComboboxInput asChild>
													<Input
														size="lg"
														name="category"
														placeholder="Choose category"
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
											<ComboboxPositioner>
												<ComboboxContent>
													<ComboboxItemGroup id="framework">
														{categories.map((item) => (
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
									<Label htmlFor="expenses.create-new.description">
										Description
									</Label>
									<Textarea
										id="expenses.create-new.description"
										size="lg"
										rows={3}
										resize="none"
										placeholder="Enter description"
										name="description"
									/>
								</Flex>

								<Flex direction="column" gap={1.5}>
									<Label htmlFor="expenses.create-new.location">Location</Label>
									<Input
										id="expenses.create-new.location"
										size="lg"
										name="location"
										placeholder="Enter location"
									/>
								</Flex>

								<DatePicker
									lazyMount
									startOfWeek={1}
									selectionMode="single"
									positioning={{
										placement: 'bottom-end',
									}}
								>
									<DatePickerLabel>Transaction date</DatePickerLabel>
									<DatePickerControl>
										<DatePickerInput asChild>
											<Input placeholder="Choose date" name="transactionDate" />
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
																			<DatePickerTableCell key={id} value={day}>
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
																	.getMonthsGrid({columns: 4, format: 'short'})
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

								<NumberInput size="lg">
									<NumberInputLabel>Amount</NumberInputLabel>
									<NumberInputControl>
										<NumberInputInput
											placeholder="Enter amount"
											name="amount"
										/>
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
							</VStack>

							<SubmitAndCancelButtons />
						</styled.form>
					</DialogContent>
				</DialogPositioner>
			</Portal>
		</Dialog>
	);
}

function SubmitAndCancelButtons() {
	const {pending} = useFormStatus();

	return (
		<HStack mt={8} gap={4}>
			<DialogCloseTrigger asChild>
				<Button w="full" size="lg" variant="outline" disabled={pending}>
					Cancel
				</Button>
			</DialogCloseTrigger>
			<Button w="full" size="lg" type="submit" disabled={pending}>
				Submit
			</Button>
		</HStack>
	);
}

const categories = Object.values(ExpenseCategory).map((category) => ({
	label: category.replace(/([A-Z])/g, ' $1').trim(),
	value: category,
}));
