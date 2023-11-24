'use client';

import {
	Accordion,
	AccordionItem,
	AccordionItemContent,
	AccordionItemIndicator,
	AccordionItemTrigger,
} from '@/components/accordion';
import {Button} from '@/components/button';
import {
	Combobox,
	ComboboxContent,
	ComboboxControl,
	ComboboxInput,
	ComboboxItem,
	ComboboxItemGroup,
	ComboboxItemGroupLabel,
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
	DialogDescription,
	DialogPositioner,
	DialogTitle,
	DialogTrigger,
} from '@/components/dialog';
import {Icon} from '@/components/icon';
import {IconButton} from '@/components/icon-button';
import {Input} from '@/components/input';
import {
	NumberInput,
	NumberInputControl,
	NumberInputDecrementTrigger,
	NumberInputIncrementTrigger,
	NumberInputInput,
	NumberInputLabel,
} from '@/components/number-input';
import {
	Switch,
	SwitchControl,
	SwitchLabel,
	SwitchThumb,
} from '@/components/switch';
import {Box, Stack, styled} from '@/styled-system/jsx';
import {Portal} from '@ark-ui/react';
import {
	CalendarIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
	ChevronsUpDownIcon,
	XIcon,
} from 'lucide-react';

export default function Index() {
	return (
		<styled.div p={4}>
			<NumberInput mt={5}>
				<NumberInputLabel>Amount</NumberInputLabel>
				<NumberInputControl>
					<NumberInputInput placeholder="Placeholder" />
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

			<Combobox
				mt={5}
				items={PRODUCTS.map((product) => ({
					label: product.name,
					value: product.id,
				}))}
			>
				<ComboboxLabel>Product</ComboboxLabel>
				<ComboboxControl>
					<ComboboxInput placeholder="Select a Product" asChild>
						<Input />
					</ComboboxInput>
					<ComboboxTrigger asChild>
						<IconButton variant="link" aria-label="open" size="xs">
							<Icon>
								<ChevronsUpDownIcon />
							</Icon>
						</IconButton>
					</ComboboxTrigger>
				</ComboboxControl>
				<Portal>
					<ComboboxPositioner>
						<ComboboxContent>
							<ComboboxItemGroup id="products">
								<ComboboxItemGroupLabel htmlFor="products">
									Products
								</ComboboxItemGroupLabel>
								{PRODUCTS.map((product) => ({
									label: product.name,
									value: product.id,
								})).map((product) => (
									<ComboboxItem key={product.value} item={product}>
										<ComboboxItemText>{product.label}</ComboboxItemText>
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
				</Portal>
			</Combobox>

			<DatePicker mt={5} positioning={{sameWidth: true}} startOfWeek={1}>
				<DatePickerLabel>Date</DatePickerLabel>
				<DatePickerControl>
					<DatePickerInput asChild>
						<Input />
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
															<DatePickerTableCell key={id} value={month.value}>
																<DatePickerTableCellTrigger asChild>
																	<Button variant="ghost">{month.label}</Button>
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
											{api.getYearsGrid({columns: 4}).map((years, id) => (
												<DatePickerTableRow key={id}>
													{years.map((year, id) => (
														<DatePickerTableCell key={id} value={year.value}>
															<DatePickerTableCellTrigger asChild>
																<Button variant="ghost">{year.label}</Button>
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

			<Box mt={5}>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Open Dialog</Button>
					</DialogTrigger>
					<Portal>
						<DialogBackdrop />
						<DialogPositioner>
							<DialogContent>
								<Stack gap="8" p="6">
									<Stack gap="1">
										<DialogTitle>Dialog Title</DialogTitle>
										<DialogDescription>Dialog Description</DialogDescription>
									</Stack>
									<Stack gap="3" direction="row" width="full">
										<DialogCloseTrigger asChild>
											<Button variant="outline" width="full">
												Cancel
											</Button>
										</DialogCloseTrigger>
										<Button width="full">Confirm</Button>
									</Stack>
								</Stack>
								<DialogCloseTrigger
									asChild
									position="absolute"
									top="2"
									right="2"
								>
									<IconButton
										aria-label="Close Dialog"
										variant="ghost"
										size="sm"
									>
										<XIcon />
									</IconButton>
								</DialogCloseTrigger>
							</DialogContent>
						</DialogPositioner>
					</Portal>
				</Dialog>
			</Box>

			<Box mt={16}>
				<Switch>
					<SwitchControl>
						<SwitchThumb />
					</SwitchControl>
					<SwitchLabel>Label</SwitchLabel>
				</Switch>
			</Box>

			<Accordion mt={16} multiple>
				{PRODUCTS.map((product) => (
					<AccordionItem key={product.id} value={product.id}>
						<AccordionItemTrigger>
							{product.name}
							<AccordionItemIndicator>
								<ChevronDownIcon />
							</AccordionItemIndicator>
						</AccordionItemTrigger>
						<AccordionItemContent>
							<div>
								Pudding donut gummies chupa chups oat cake marzipan biscuit
								tart. Dessert macaroon ice cream bonbon jelly. Jelly topping
								tiramisu halvah lollipop.
							</div>
						</AccordionItemContent>
					</AccordionItem>
				))}
			</Accordion>
		</styled.div>
	);
}

const PRODUCTS = [
	{id: 'P001', name: 'MacBook Pro', stock: 12, price: '$1999.00'},
	{id: 'P002', name: 'AirPods Pro', stock: 25, price: '$249.00'},
	{id: 'P003', name: 'Leather Wallet', stock: 50, price: '$79.00'},
];
