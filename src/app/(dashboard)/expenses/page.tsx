import {Button} from "@/components/button";
import {Icon} from "@/components/icon";
import {
	Menu,
	MenuContent,
	MenuItem,
	MenuItemGroup,
	MenuPositioner,
	MenuTrigger,
} from "@/components/menu";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/table";
import {
	Tooltip,
	TooltipArrow,
	TooltipArrowTip,
	TooltipContent,
	TooltipPositioner,
	TooltipTrigger,
} from "@/components/tooltip";
import {prisma} from "@/config/prisma";
import {Box, Center, Flex, HStack, Spacer, styled} from "@/styled-system/jsx";
import {currencyFormatter} from "@/utils/currency-formatter";
import {
	ExpenseFilterSchema,
	PaginationSchema,
	TExpenseFilterSchema,
} from "@/utils/types";
import {Portal} from "@ark-ui/react";
import {Prisma} from "@prisma/client";
import assert from "assert";
import {format, formatDistanceToNow} from "date-fns";
import {FileEditIcon, PlusIcon, SettingsIcon} from "lucide-react";
import {Metadata} from "next";
import {cookies} from "next/headers";
import {Suspense, cache} from "react";
import {Spinner} from "../../spinner";
import {PageControls} from "../page-controls";
import {DeleteExpense} from "./delete-expense";
import {Export} from "./export";
import {Filter} from "./filter";
import {UpsertExpense} from "./upsert-expense";

export const metadata: Metadata = {
	title: "Expenses",
};

interface ExpensesProps {
	searchParams: {[key: string]: string | string[]};
}

export default async function Expenses(props: ExpensesProps) {
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
					_scrollbar={{
						bg: "bg.subtle",
					}}
					_scrollbarThumb={{
						bg: "bg.default",
						bgClip: "padding-box",
						border: "5px solid token(colors.transparent)",
						rounded: "full",
					}}
					_scrollbarTrack={{
						bg: "transparent",
					}}
				>
					<Table
						pos="relative"
						variant="outline"
						border="none"
						borderCollapse="separate"
						borderSpacing={0}
						css={{
							"& thead, & tfoot, & tr": {
								bg: "none",
							},
							"& th, & td": {
								bg: "bg.default",
								border: "none",
								borderLeft: "1px solid token(colors.border.subtle)",
								borderBottom: "1px solid token(colors.border.subtle)",
								_first: {
									borderLeft: "none",
								},
							},
							"& th": {
								fontSize: "xs",
								fontFamily: "heading",
							},
							"& tfoot td": {
								borderBottom: "none",
							},
						}}
					>
						<TableHeader>
							<TableRow>
								<TableHead>Category</TableHead>
								<TableHead>Description</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead>Location</TableHead>
								<TableHead>Transaction Date</TableHead>
								<TableHead>Date Created</TableHead>
								<TableHead>Date Updated</TableHead>
								<TableHead w="0" pos="sticky" right={0}>
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>

						<Suspense
							fallback={
								<TableBody>
									<TableRow>
										<TableCell colSpan={8}>
											<Center>
												<HStack>
													<Spinner />
													<styled.span color="fg.muted">Loading...</styled.span>
												</HStack>
											</Center>
										</TableCell>
									</TableRow>
								</TableBody>
							}
						>
							<TableContent {...props} />
						</Suspense>
					</Table>
				</Box>
			</Box>

			<Suspense fallback={null}>
				<BottomControls {...props} />
			</Suspense>
		</Box>
	);
}

async function TableContent({searchParams}: ExpensesProps) {
	const id = cookies().get("user")?.value;

	assert(id);

	const user = await getUser(id);
	const params = parseParams(searchParams);

	const expenses = await prisma.expense.findMany({
		skip: params.size * (params.page - 1),
		take: params.size,
		where: {user: {id}, ...paramsToWhereClause(params)},
		include: {
			user: {
				select: {
					currency: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<>
			<TableBody>
				{expenses.map((expense) => (
					<TableRow key={expense.id}>
						<TableCell>{expense.category}</TableCell>
						<TableCell>
							<styled.div maxW="8rem" truncate>
								{expense.description}
							</styled.div>
						</TableCell>
						<TableCell fontVariantNumeric="tabular-nums">
							{currencyFormatter.format(expense.amount, user.currency)}
						</TableCell>
						<TableCell>
							<styled.div maxW="5rem" truncate>
								{expense.location}
							</styled.div>
						</TableCell>
						<TableCell>
							<Tooltip
								positioning={{
									placement: "right",
								}}
							>
								<TooltipTrigger asChild>
									<styled.span>
										{formatDistanceToNow(expense.transactionDate, {
											addSuffix: true,
										})}
									</styled.span>
								</TooltipTrigger>
								<Portal>
									<TooltipPositioner>
										<TooltipContent>
											<TooltipArrow>
												<TooltipArrowTip />
											</TooltipArrow>
											{format(expense.transactionDate, "yyyy MMM dd")}
										</TooltipContent>
									</TooltipPositioner>
								</Portal>
							</Tooltip>
						</TableCell>
						<TableCell>
							<Tooltip
								positioning={{
									placement: "right",
								}}
							>
								<TooltipTrigger asChild>
									<styled.span>
										{formatDistanceToNow(expense.createdAt, {
											addSuffix: true,
										})}
									</styled.span>
								</TooltipTrigger>
								<Portal>
									<TooltipPositioner>
										<TooltipContent>
											<TooltipArrow>
												<TooltipArrowTip />
											</TooltipArrow>
											{format(expense.createdAt, "yyyy MMM dd hh:mm a")}
										</TooltipContent>
									</TooltipPositioner>
								</Portal>
							</Tooltip>
						</TableCell>
						<TableCell>
							<Tooltip
								positioning={{
									placement: "right",
								}}
							>
								<TooltipTrigger asChild>
									<styled.span>
										{formatDistanceToNow(expense.updatedAt, {
											addSuffix: true,
										})}
									</styled.span>
								</TooltipTrigger>
								<Portal>
									<TooltipPositioner>
										<TooltipContent>
											<TooltipArrow>
												<TooltipArrowTip />
											</TooltipArrow>
											{format(expense.updatedAt, "yyyy MMM dd hh:mm a")}
										</TooltipContent>
									</TooltipPositioner>
								</Portal>
							</Tooltip>
						</TableCell>
						<TableCell textAlign="center" pos="sticky" right={0}>
							<Menu
								positioning={{
									placement: "bottom-start",
								}}
							>
								<MenuTrigger asChild>
									<styled.button cursor="pointer">
										<Icon>
											<SettingsIcon />
										</Icon>
									</styled.button>
								</MenuTrigger>
								<Portal>
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
								</Portal>
							</Menu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell />
					<TableCell />
					<TableCell fontVariantNumeric="tabular-nums">
						{currencyFormatter.format(
							expenses.reduce((total, {amount}) => total + amount, 0),
							user.currency,
						)}
					</TableCell>
					<TableCell />
					<TableCell />
					<TableCell />
					<TableCell />
					<TableCell pos="sticky" right={0} />
				</TableRow>
			</TableFooter>
		</>
	);
}

async function BottomControls({searchParams}: ExpensesProps) {
	const id = cookies().get("user")?.value;

	assert(id);

	const params = parseParams(searchParams);
	const count = await prisma.expense.count({
		where: {user: {id}, ...paramsToWhereClause(params)},
	});

	return (
		<Box mt={8}>
			<PageControls __SSR_DATA={{count}} />
		</Box>
	);
}

const getUser = cache(async (id: string) => {
	return await prisma.user.findUniqueOrThrow({
		where: {id},
		select: {
			currency: true,
		},
	});
});

const parseParams = cache((searchParams: unknown) => {
	return {
		...ExpenseFilterSchema.parse(searchParams),
		...PaginationSchema.parse(searchParams),
	};
});

const paramsToWhereClause = cache((args: TExpenseFilterSchema) => {
	const {
		category,
		location,
		minAmount,
		maxAmount,
		transactionDateStart,
		transactionDateUntil,
	} = args;

	const whereClause: Prisma.ExpenseWhereInput = {
		...([minAmount, maxAmount].some(Boolean) && {
			amount: {
				...(minAmount && {gte: minAmount}),
				...(maxAmount && {lte: maxAmount}),
			},
		}),
		...(category?.length && {
			category: {in: category},
		}),
		...(location && {
			location: {contains: location},
		}),
		...([transactionDateStart, transactionDateUntil].some(Boolean) && {
			transactionDate: {
				...(transactionDateStart && {gte: transactionDateStart}),
				...(transactionDateUntil && {lte: transactionDateUntil}),
			},
		}),
	};

	return whereClause;
});
