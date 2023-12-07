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
	const summary = await getSummary(Duration.LastWeek);

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
				$addFields: {
					month: "$_id",
				},
			},
			{
				$project: {
					_id: 0,
					month: {
						$switch: {
							branches: [
								{case: {$eq: ["$month", 1]}, then: "Jan"},
								{case: {$eq: ["$month", 2]}, then: "Feb"},
								{case: {$eq: ["$month", 3]}, then: "Mar"},
								{case: {$eq: ["$month", 4]}, then: "Apr"},
								{case: {$eq: ["$month", 5]}, then: "May"},
								{case: {$eq: ["$month", 6]}, then: "Jun"},
								{case: {$eq: ["$month", 7]}, then: "Jul"},
								{case: {$eq: ["$month", 8]}, then: "Aug"},
								{case: {$eq: ["$month", 9]}, then: "Sep"},
								{case: {$eq: ["$month", 10]}, then: "Oct"},
								{case: {$eq: ["$month", 11]}, then: "Nov"},
								{case: {$eq: ["$month", 12]}, then: "Dec"},
							],
						},
					},
					index: {
						$subtract: ["$month", 1],
					},
					total: {
						$round: ["$total", 2],
					},
				},
			},
			{
				$sort: {
					index: 1,
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
						$add: [
							{
								$floor: {
									$divide: [
										{
											$dayOfMonth: "$transactionDate",
										},
										7,
									],
								},
							},
							1,
						],
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
						$dayOfWeek: "$transactionDate",
					},
					total: {
						$sum: "$amount",
					},
				},
			},
			{
				$addFields: {
					day: "$_id",
				},
			},
			{
				$project: {
					_id: 0,
					day: {
						$switch: {
							branches: [
								{case: {$eq: ["$day", 1]}, then: "Sun"},
								{case: {$eq: ["$day", 2]}, then: "Mon"},
								{case: {$eq: ["$day", 3]}, then: "Tue"},
								{case: {$eq: ["$day", 4]}, then: "Wed"},
								{case: {$eq: ["$day", 5]}, then: "Thu"},
								{case: {$eq: ["$day", 6]}, then: "Fri"},
								{case: {$eq: ["$day", 7]}, then: "Sat"},
							],
						},
					},
					index: "$day",
					total: {
						$round: ["$total", 2],
					},
				},
			},
			{
				$sort: {
					index: 1,
				},
			},
		],
	});
}
