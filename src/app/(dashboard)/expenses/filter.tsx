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
	Drawer,
	DrawerBackdrop,
	DrawerBody,
	DrawerCloseTrigger,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerPositioner,
	DrawerTrigger,
} from '@/components/drawer';
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
import {Box, Flex, HStack} from '@/styled-system/jsx';
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
	SearchIcon,
} from 'lucide-react';

export function Filter() {
	return (
		<Drawer lazyMount>
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
							<Combobox items={categories}>
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
												<ComboboxItemGroup id="framework">
													{categories.map((item) => (
														<ComboboxItem key={item.value} item={item}>
															<ComboboxItemText>{item.label}</ComboboxItemText>
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
									placeholder="Enter location"
								/>
							</Box>

							<DatePicker
								mt={4}
								startOfWeek={1}
								lazyMount
								selectionMode="range"
								positioning={{
									placement: 'bottom-end',
								}}
							>
								<DatePickerLabel>Transaction date</DatePickerLabel>
								<DatePickerControl>
									<DatePickerInput asChild>
										<Input placeholder="Choose date" />
									</DatePickerInput>
									<DatePickerTrigger asChild>
										<IconButton variant="outline" aria-label="Open date picker">
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

							<HStack mt={4} alignItems="end" gap={4}>
								<NumberInput>
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

								<NumberInput>
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
							<DrawerCloseTrigger asChild>
								<Button w="full" variant="outline">
									Cancel
								</Button>
							</DrawerCloseTrigger>
							<Button w="full">Save</Button>
						</DrawerFooter>
					</DrawerContent>
				</DrawerPositioner>
			</Portal>
		</Drawer>
	);
}

const categories = Object.values(ExpenseCategory).map((category) => ({
	label: category.replace(/([A-Z])/g, ' $1'),
	value: category,
}));
