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
import {prisma} from "@/config/prisma";
import {Box, Center, Flex, HStack, Spacer, styled} from "@/styled-system/jsx";
import {numberFormatter} from "@/utils/number-formatter";
import {Portal} from "@ark-ui/react";
import assert from "assert";
import {format} from "date-fns";
import {FileEditIcon, PlusIcon, SettingsIcon} from "lucide-react";
import {Metadata} from "next";
import {cookies} from "next/headers";
import {Suspense, cache} from "react";
import {Spinner} from "../../spinner";
import {PageControls} from "../page-controls";
import {PaginationSchema} from "../schema";
import {DeleteExpense} from "./delete-expense";
import {Export} from "./export";
import {Filter} from "./filter";
import {ExpenseFilterSchema} from "./schema";
import {UpsertExpense} from "./upsert-expense";
import {paramsToWhereClause} from "./utils.server";

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
								textAlign: "center",
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
								<TableHead maxW={16} minW={16} pos="sticky" right={0}>
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

	const params = parseParams(searchParams);
	const expenses = await prisma.expense.findMany({
		skip: params.size * (params.page - 1),
		take: params.size,
		where: {user: {id}, ...paramsToWhereClause(params)},
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<>
			<TableBody>
				{expenses.length === 0 && (
					<TableRow>
						<TableCell colSpan={8}>No records found</TableCell>
					</TableRow>
				)}

				{expenses.map((expense) => (
					<TableRow key={expense.id}>
						<TableCell>{expense.category}</TableCell>
						<TableCell>
							<styled.div maxW="12rem" truncate>
								{expense.description}
							</styled.div>
						</TableCell>
						<TableCell fontFamily="mono" textAlign="right!">
							{numberFormatter.format(expense.amount)}
						</TableCell>
						<TableCell>
							<styled.div maxW="8rem" truncate>
								{expense.location}
							</styled.div>
						</TableCell>
						<TableCell>
							{format(expense.transactionDate, "yyyy MMM dd")}
						</TableCell>
						<TableCell>
							{format(expense.createdAt, "yyyy MMM dd hh:mm a")}
						</TableCell>
						<TableCell>
							{format(expense.updatedAt, "yyyy MMM dd hh:mm a")}
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

			{expenses.length > 0 && (
				<TableFooter>
					<TableRow>
						<TableCell />
						<TableCell />
						<TableCell fontFamily="mono" textAlign="right!">
							{numberFormatter.format(
								expenses.reduce((total, {amount}) => total + amount, 0),
							)}
						</TableCell>
						<TableCell />
						<TableCell />
						<TableCell />
						<TableCell />
						<TableCell pos="sticky" right={0} />
					</TableRow>
				</TableFooter>
			)}
		</>
	);
}

async function BottomControls({searchParams}: ExpensesProps) {
	const userId = cookies().get("user")?.value;

	assert(userId);

	const where = {userId, ...paramsToWhereClause(parseParams(searchParams))};
	const count = await prisma.expense.count({where});

	return (
		<Box mt={8}>
			<PageControls __SSR_DATA={{count}} />
		</Box>
	);
}

const parseParams = cache((searchParams: unknown) => {
	return {
		...ExpenseFilterSchema.parse(searchParams),
		...PaginationSchema.parse(searchParams),
	};
});
