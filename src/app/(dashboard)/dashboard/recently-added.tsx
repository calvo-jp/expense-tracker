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
import {Box, styled} from "@/styled-system/jsx";
import {formatNumber} from "@/utils/format-number";
import {pascalToSentenceCase} from "@/utils/pascal-to-sentence-case";
import assert from "assert";
import {format} from "date-fns";
import {cookies} from "next/headers";
import {Duration, getDurationValue} from "./utils";

interface RecentlyAddedProps {
	duration: Duration;
}

export async function RecentlyAdded(props: RecentlyAddedProps) {
	const id = cookies().get("user")?.value;

	assert(id);

	const {start, until} = getDurationValue(props.duration);

	const expenses = await prisma.expense.findMany({
		take: 5,
		where: {
			user: {id},
			transactionDate: {
				gte: start,
				lte: until,
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
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
				variant="outline"
				border="none"
				borderCollapse="separate"
				borderSpacing={0}
				css={{
					"& thead, & tfoot, & tr": {
						bg: "none",
					},
					"& th, & td": {
						px: 4,
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
					</TableRow>
				</TableHeader>
				<TableBody>
					{expenses.map((expense) => (
						<TableRow key={expense.id}>
							<TableCell>{pascalToSentenceCase(expense.category)}</TableCell>
							<TableCell>
								<styled.div maxW="12rem" truncate>
									{expense.description}
								</styled.div>
							</TableCell>
							<TableCell fontFamily="mono" textAlign="right!">
								{formatNumber(expense.amount)}
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
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell />
						<TableCell />
						<TableCell fontFamily="mono" textAlign="right!">
							{formatNumber(
								expenses.reduce((total, {amount}) => total + amount, 0),
							)}
						</TableCell>
						<TableCell />
						<TableCell />
						<TableCell />
						<TableCell />
					</TableRow>
				</TableFooter>
			</Table>
		</Box>
	);
}
