'use client';

import {
	Accordion,
	AccordionItem,
	AccordionItemContent,
	AccordionItemIndicator,
	AccordionItemTrigger,
} from '@/components/accordion';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/avatar';
import {Button} from '@/components/button';
import {Checkbox, CheckboxControl} from '@/components/checkbox';
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
import {
	Drawer,
	DrawerBackdrop,
	DrawerBody,
	DrawerCloseTrigger,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerPositioner,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/drawer';
import {Icon} from '@/components/icon';
import {IconButton} from '@/components/icon-button';
import {Input} from '@/components/input';
import {
	Menu,
	MenuContent,
	MenuItem,
	MenuItemGroup,
	MenuItemGroupLabel,
	MenuPositioner,
	MenuSeparator,
	MenuTrigger,
	MenuTriggerItem,
} from '@/components/menu';
import {
	NumberInput,
	NumberInputControl,
	NumberInputDecrementTrigger,
	NumberInputIncrementTrigger,
	NumberInputInput,
} from '@/components/number-input';
import {
	Pagination,
	PaginationEllipsis,
	PaginationItem,
	PaginationNextTrigger,
	PaginationPrevTrigger,
} from '@/components/pagination';
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
} from '@/components/select';
import {Switch, SwitchControl, SwitchLabel, SwitchThumb} from '@/components/switch';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/table';
import {Textarea} from '@/components/textarea';
import {toast} from '@/components/toaster';
import {
	Tooltip,
	TooltipArrow,
	TooltipArrowTip,
	TooltipContent,
	TooltipPositioner,
	TooltipTrigger,
} from '@/components/tooltip';
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
	MinusIcon,
	Settings2Icon,
	XIcon,
} from 'lucide-react';

const items = [
	{label: 'React', value: 'react'},
	{label: 'Solid', value: 'solid'},
	{label: 'Svelte', value: 'svelte'},
	{label: 'Vue', value: 'vue'},
];

export default function Index() {
	return (
		<styled.div p={4}>
			<Tooltip openDelay={0} closeDelay={0} open={true}>
				<TooltipTrigger>
					<Avatar>
						<AvatarFallback>JP</AvatarFallback>
						<AvatarImage src="https://i.pravatar.cc/150" alt="" />
					</Avatar>
				</TooltipTrigger>
				<Portal>
					<TooltipPositioner>
						<TooltipContent>
							<TooltipArrow
								css={{
									'--arrow-size': 'token(sizes.3)',
									'--arrow-background': 'colors.fg.default',
								}}
							>
								<TooltipArrowTip />
							</TooltipArrow>
							Hello whats up?
						</TooltipContent>
					</TooltipPositioner>
				</Portal>
			</Tooltip>

			<Box mt={5}>
				<IconButton
					onClick={() => {
						toast.create({
							title: 'Title',
							description: 'Description',
						});
					}}
				>
					<Icon>
						<Settings2Icon />
					</Icon>
				</IconButton>
			</Box>

			<Box mt={5}>
				<Menu>
					<MenuTrigger asChild>
						<Button variant="outline">Open Menu</Button>
					</MenuTrigger>
					<MenuPositioner>
						<MenuContent>
							<MenuItemGroup id="group-1">
								<MenuItemGroupLabel htmlFor="group-1">My Account</MenuItemGroupLabel>
								<MenuSeparator />
								<MenuItem id="1">One</MenuItem>
								<MenuItem id="2">Two</MenuItem>
								<Menu positioning={{placement: 'right-start', gutter: -2}}>
									<MenuTriggerItem justifyContent="space-between">Three</MenuTriggerItem>
									<MenuPositioner>
										<MenuContent>
											<MenuItem id="3">Four</MenuItem>
											<MenuItem id="4">Five</MenuItem>
										</MenuContent>
									</MenuPositioner>
								</Menu>
								<MenuSeparator />
								<MenuItem id="5">Logout</MenuItem>
							</MenuItemGroup>
						</MenuContent>
					</MenuPositioner>
				</Menu>
			</Box>

			<Input mt={5} placeholder="Placeholder" />

			<NumberInput mt={5}>
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

			<Select mt={5} loop positioning={{sameWidth: true}} items={items}>
				<SelectControl>
					<SelectTrigger>
						<SelectValueText placeholder="Select a Product" />
						<Icon>
							<ChevronsUpDownIcon />
						</Icon>
					</SelectTrigger>
				</SelectControl>

				<Portal>
					<SelectPositioner>
						<SelectContent>
							<SelectItemGroup id="products--select">
								{PRODUCTS.map((product) => ({
									label: product.name,
									value: product.id,
								})).map((product) => (
									<SelectItem key={product.value} item={product}>
										<SelectItemText>{product.label}</SelectItemText>
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
				<DatePickerLabel>Date Picker</DatePickerLabel>
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
												<ChevronLeftIcon />
											</IconButton>
										</DatePickerPrevTrigger>
										<DatePickerViewTrigger asChild>
											<Button variant="ghost" size="sm">
												<DatePickerRangeText />
											</Button>
										</DatePickerViewTrigger>
										<DatePickerNextTrigger asChild>
											<IconButton variant="ghost" size="sm">
												<ChevronRightIcon />
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
																<IconButton variant="ghost">{day.day}</IconButton>
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
												<ChevronLeftIcon />
											</IconButton>
										</DatePickerPrevTrigger>
										<DatePickerViewTrigger asChild>
											<Button variant="ghost" size="sm">
												<DatePickerRangeText />
											</Button>
										</DatePickerViewTrigger>
										<DatePickerNextTrigger asChild>
											<IconButton variant="ghost" size="sm">
												<ChevronRightIcon />
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
												<ChevronLeftIcon />
											</IconButton>
										</DatePickerPrevTrigger>
										<DatePickerViewTrigger asChild>
											<Button variant="ghost" size="sm">
												<DatePickerRangeText />
											</Button>
										</DatePickerViewTrigger>
										<DatePickerNextTrigger asChild>
											<IconButton variant="ghost" size="sm">
												<ChevronRightIcon />
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

			<Textarea mt={5} placeholder="Placeholder" />

			<Button
				mt={5}
				onClick={() => {
					toast.create({
						title: 'Title',
						description: 'Description',
					});
				}}
			>
				Submit
			</Button>

			<Box mt={5}>
				<Table variant="outline">
					<TableHeader>
						<TableRow>
							<TableHead>
								<Checkbox checked="indeterminate">
									{(state) => (
										<>
											<CheckboxControl>
												{state.isChecked && (
													<Icon size="sm">
														<CheckIcon />
													</Icon>
												)}

												{state.isIndeterminate && (
													<Icon size="sm">
														<MinusIcon />
													</Icon>
												)}
											</CheckboxControl>
										</>
									)}
								</Checkbox>
							</TableHead>
							<TableHead>ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Stock</TableHead>
							<TableHead textAlign="right">Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{PRODUCTS.map((product, index) => (
							<TableRow key={index}>
								<TableCell>
									<Checkbox defaultChecked>
										{(state) => (
											<>
												<CheckboxControl>
													{state.isChecked && (
														<Icon size="sm">
															<CheckIcon />
														</Icon>
													)}

													{state.isIndeterminate && (
														<Icon size="sm">
															<MinusIcon />
														</Icon>
													)}
												</CheckboxControl>
											</>
										)}
									</Checkbox>
								</TableCell>
								<TableCell fontWeight="medium">{product.id}</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell>{product.stock}</TableCell>
								<TableCell textAlign="right">{product.price}</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={2}>Totals</TableCell>
							<TableCell>87</TableCell>
							<TableCell textAlign="right">$34,163.00</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</Box>

			<Pagination
				mt={5}
				w="fit"
				count={90}
				pageSize={10}
				siblingCount={1}
				defaultPage={2}
			>
				{({pages}) => (
					<>
						<PaginationPrevTrigger asChild>
							<IconButton variant="outline" aria-label="Next Page">
								<Icon>
									<ChevronLeftIcon />
								</Icon>
							</IconButton>
						</PaginationPrevTrigger>

						{pages.map((page, index) =>
							page.type === 'page' ? (
								<PaginationItem key={index} {...page} asChild>
									<Button variant="outline">{page.value}</Button>
								</PaginationItem>
							) : (
								<PaginationEllipsis key={index} index={index}>
									&#8230;
								</PaginationEllipsis>
							),
						)}

						<PaginationNextTrigger asChild>
							<IconButton variant="outline" aria-label="Next Page">
								<Icon>
									<ChevronRightIcon />
								</Icon>
							</IconButton>
						</PaginationNextTrigger>
					</>
				)}
			</Pagination>

			<Drawer>
				<DrawerTrigger asChild>
					<Button mt={5}>Open Drawer</Button>
				</DrawerTrigger>
				<Portal>
					<DrawerBackdrop />
					<DrawerPositioner>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Title</DrawerTitle>
								<DrawerDescription>Description</DrawerDescription>
								<DrawerCloseTrigger asChild position="absolute" top="3" right="4">
									<IconButton variant="ghost">
										<Icon>
											<XIcon />
										</Icon>
									</IconButton>
								</DrawerCloseTrigger>
							</DrawerHeader>
							<DrawerBody>{/* Content */}</DrawerBody>
							<DrawerFooter gap="3">
								<DrawerCloseTrigger asChild>
									<Button variant="outline">Cancel</Button>
								</DrawerCloseTrigger>
								<Button>Primary</Button>
							</DrawerFooter>
						</DrawerContent>
					</DrawerPositioner>
				</Portal>
			</Drawer>

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
								<DialogCloseTrigger asChild position="absolute" top="2" right="2">
									<IconButton aria-label="Close Dialog" variant="ghost" size="sm">
										<XIcon />
									</IconButton>
								</DialogCloseTrigger>
							</DialogContent>
						</DialogPositioner>
					</Portal>
				</Dialog>
			</Box>

			<Box mt={5}>
				<Switch>
					<SwitchControl>
						<SwitchThumb />
					</SwitchControl>
					<SwitchLabel>Label</SwitchLabel>
				</Switch>
			</Box>

			<Accordion mt={12} multiple>
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
								Pudding donut gummies chupa chups oat cake marzipan biscuit tart. Dessert
								macaroon ice cream bonbon jelly. Jelly topping tiramisu halvah lollipop.
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
