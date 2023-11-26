import {Button} from '@/components/button';
import {Icon} from '@/components/icon';
import {
	Menu,
	MenuContent,
	MenuItem,
	MenuItemGroup,
	MenuPositioner,
	MenuTrigger,
} from '@/components/menu';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/table';
import {
	Tooltip,
	TooltipArrow,
	TooltipArrowTip,
	TooltipContent,
	TooltipPositioner,
	TooltipTrigger,
} from '@/components/tooltip';
import {prisma} from '@/config/prisma';
import {Box, Flex, HStack, Spacer, styled} from '@/styled-system/jsx';
import {currencyFormatter} from '@/utils/formatter';
import {PaginationSchema} from '@/utils/schema';
import assert from 'assert';
import {format, formatDistanceToNow} from 'date-fns';
import {FileEditIcon, PlusIcon, SettingsIcon} from 'lucide-react';
import {Metadata} from 'next';
import {cookies} from 'next/headers';
import {Suspense} from 'react';
import {PageControls} from '../page-controls';
import {DeleteExpense} from './delete-expense';
import {Export} from './export';
import {Filter} from './filter';
import {UpsertExpense} from './upsert-expense';

export const metadata: Metadata = {
	title: 'Expenses',
};

export default async function Expenses({
	searchParams,
}: {
	searchParams: {[key: string]: string | string[]};
}) {
	const id = cookies().get('user')?.value;

	assert(id);

	const user = await prisma.user.findUnique({
		where: {id},
		select: {
			currency: true,
		},
	});

	const pagination = PaginationSchema.parse(searchParams);
	const expenses = await prisma.expense.findMany({
		where: {user: {id}},
		include: {
			user: {
				select: {
					currency: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: pagination.size,
		skip: pagination.size * (pagination.page - 1),
	});

	return (
		<Box>
			<Flex>
				<styled.h1 textStyle="3xl" fontFamily="heading" fontWeight="bold">
					Expenses
				</styled.h1>
				<Spacer />
				<Flex gap={3}>
					<Export />
					<Filter />
					<UpsertExpense type="create">
						<Button variant="outline">
							<Icon>
								<PlusIcon />
							</Icon>
							Add new
						</Button>
					</UpsertExpense>
				</Flex>
			</Flex>

			<Box mt={8}>
				<Box
					maxW="full"
					display="block"
					overflowX="auto"
					overflowY="hidden"
					whiteSpace="nowrap"
					WebkitOverflowScrolling="touch"
					borderWidth="1px"
				>
					<Table variant="outline" border="none">
						<TableHeader>
							<TableRow>
								<TableHead>Category</TableHead>
								<TableHead>Description</TableHead>
								<TableHead>Location</TableHead>
								<TableHead>Transaction date</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{expenses.map((expense) => (
								<TableRow key={expense.id}>
									<TableCell>{expense.category}</TableCell>
									<TableCell>
										<styled.div maxW="8rem" truncate>
											{expense.description}
										</styled.div>
									</TableCell>
									<TableCell>
										<styled.div maxW="5rem" truncate>
											{expense.location}
										</styled.div>
									</TableCell>
									<TableCell>
										<Tooltip
											positioning={{
												placement: 'right',
											}}
										>
											<TooltipTrigger asChild>
												<styled.span>
													{formatDistanceToNow(expense.transactionDate, {
														addSuffix: true,
													})}
												</styled.span>
											</TooltipTrigger>
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

													{format(expense.transactionDate, 'yyyy MMM dd')}
												</TooltipContent>
											</TooltipPositioner>
										</Tooltip>
									</TableCell>
									<TableCell fontVariantNumeric="tabular-nums">
										{currencyFormatter.format(expense.amount, user?.currency)}
									</TableCell>
									<TableCell>
										<Menu
											positioning={{
												placement: 'bottom-start',
											}}
										>
											<MenuTrigger asChild>
												<styled.button cursor="pointer">
													<Icon>
														<SettingsIcon />
													</Icon>
												</styled.button>
											</MenuTrigger>
											<MenuPositioner>
												<MenuContent w="12rem" shadow="none" borderWidth="1px">
													<MenuItemGroup id={`expenses-menu--${expense.id}`}>
														<UpsertExpense type="update" data={expense}>
															<MenuItem
																id={`expenses.items.${expense.id}.menu.edit`}
															>
																<HStack>
																	<Icon>
																		<FileEditIcon />
																	</Icon>
																	<styled.span>Edit</styled.span>
																</HStack>
															</MenuItem>
														</UpsertExpense>

														<DeleteExpense data={expense} />
													</MenuItemGroup>
												</MenuContent>
											</MenuPositioner>
										</Menu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={4}>Total</TableCell>
								<TableCell fontVariantNumeric="tabular-nums">
									{currencyFormatter.format(
										expenses.reduce((total, {amount}) => total + amount, 0),
										user?.currency,
									)}
								</TableCell>
								<TableCell />
							</TableRow>
						</TableFooter>
					</Table>
				</Box>
			</Box>

			<Suspense fallback={null}>
				<BottomControls />
			</Suspense>
		</Box>
	);
}

async function BottomControls() {
	const count = await prisma.expense.count();

	return (
		<Box mt={8}>
			<PageControls __SSR_DATA={{count}} />
		</Box>
	);
}
