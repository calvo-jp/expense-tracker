import {prisma} from "@/config/prisma";
import {Box} from "@/styled-system/jsx";
import assert from "assert";
import {cookies} from "next/headers";
import {ExpensesPerCategoryGraph} from "./expenses-per-category-graph";
import {DateRange, Duration, getDurationValue} from "./utils";

interface ExpensesPerCategoryProps {
	duration: Duration;
}

export async function ExpensesPerCategory(props: ExpensesPerCategoryProps) {
	const summary = await getSummary(Duration.LastMonth);

	console.log(summary);

	return (
		<Box
			py={12}
			pr={10}
			pl={5}
			bg="gray.a2"
			border="1px solid token(colors.gray.a4)"
			rounded="sm"
		>
			<ExpensesPerCategoryGraph />
		</Box>
	);
}

async function getSummary(duration: Duration) {
	switch (duration) {
		case Duration.ThisYear:
		case Duration.LastYear:
			return getYearSummary(getDurationValue(duration));
		case Duration.ThisMonth:
		case Duration.LastMonth:
			return getMonthSummary(getDurationValue(duration));
		case Duration.ThisWeek:
		case Duration.LastWeek:
			return getWeekSummary(getDurationValue(duration));
		default:
			break;
	}
}

async function getYearSummary(range: DateRange) {
	const userId = cookies().get("user")?.value;

	assert(userId);

	return await prisma.expense.aggregateRaw({
		pipeline: [
			/**
			 * @see https://github.com/prisma/prisma/discussions/12937
			 */
			{
				$match: {
					$expr: {
						$and: [
							{userId},
							{
								$gte: [
									"$transactionDate",
									{
										$dateFromString: {
											dateString: range.start,
										},
									},
								],
							},
							{
								$lte: [
									"$transactionDate",
									{
										$dateFromString: {
											dateString: range.until,
										},
									},
								],
							},
						],
					},
				},
			},
			{
				$group: {
					_id: {
						$month: "$transactionDate",
					},
					total: {
						$sum: "$amount",
					},
				},
			},
			{
				$project: {
					_id: 0,
					month: "$_id",
					total: {
						$round: ["$total", 2],
					},
				},
			},
			{
				$sort: {
					month: 1,
				},
			},
		],
	});
}

async function getMonthSummary(range: DateRange) {
	const userId = cookies().get("user")?.value;

	assert(userId);

	return await prisma.expense.aggregateRaw({
		pipeline: [
			{
				$match: {
					$expr: {
						$and: [
							{userId},
							{
								$gte: [
									"$transactionDate",
									{
										$dateFromString: {
											dateString: range.start,
										},
									},
								],
							},
							{
								$lte: [
									"$transactionDate",
									{
										$dateFromString: {
											dateString: range.until,
										},
									},
								],
							},
						],
					},
				},
			},
			{
				$group: {
					_id: {
						$week: "$transactionDate",
					},
					total: {
						$sum: "$amount",
					},
				},
			},
			{
				$project: {
					_id: 0,
					week: "$_id",
					total: {
						$round: ["$total", 2],
					},
				},
			},
			{
				$sort: {
					week: 1,
				},
			},
		],
	});
}

async function getWeekSummary(range: DateRange) {
	const userId = cookies().get("user")?.value;

	assert(userId);

	return [];
}
