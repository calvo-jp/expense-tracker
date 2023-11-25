'use client';

import {Button} from '@/components/button';
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
import {
	CalendarIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
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
							<Box>
								<Label>What</Label>
								<Input mt={1} placeholder="eg. Bill" />
							</Box>

							<Box mt={4}>
								<Label>Where</Label>
								<Input mt={1} placeholder="eg. Mcdo" />
							</Box>

							<DatePicker
								mt={4}
								positioning={{sameWidth: true}}
								startOfWeek={1}
								lazyMount
								selectionMode="range"
							>
								<DatePickerLabel>When</DatePickerLabel>
								<DatePickerControl>
									<DatePickerInput asChild>
										<Input placeholder="Choose a date" />
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
											<Icon>
												<ChevronUpIcon />
											</Icon>
										</NumberInputIncrementTrigger>
										<NumberInputDecrementTrigger>
											<Icon>
												<ChevronDownIcon />
											</Icon>
										</NumberInputDecrementTrigger>
									</NumberInputControl>
								</NumberInput>

								<NumberInput>
									<NumberInputControl>
										<NumberInputInput placeholder="Max" />
										<NumberInputIncrementTrigger>
											<Icon>
												<ChevronUpIcon />
											</Icon>
										</NumberInputIncrementTrigger>
										<NumberInputDecrementTrigger>
											<Icon>
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
