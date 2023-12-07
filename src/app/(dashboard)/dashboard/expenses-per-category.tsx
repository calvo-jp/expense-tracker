import {prisma} from "@/config/prisma";
import {Box} from "@/styled-system/jsx";
import assert from "assert";
import {cookies} from "next/headers";
import {ExpensesPerCategoryGraph} from "./expenses-per-category-graph";
import {Data} from "./types";
import {DateRange, Duration, getDurationValue} from "./utils";

interface ExpensesPerCategoryProps {
	duration: Duration;
}

export async function ExpensesPerCategory(props: ExpensesPerCategoryProps) {
	const summary = await getSummary(props.duration);

	return (
		<Box
			py={12}
			pr={10}
			pl={5}
			bg="gray.a2"
			border="1px solid token(colors.gray.a4)"
			rounded="sm"
		>
			<ExpensesPerCategoryGraph data={summary} />
		</Box>
	);
}

async function getSummary(duration: Duration) {
	switch (duration) {
		case Duration.ThisMonth:
		case Duration.LastMonth:
			return getMonthSummary(getDurationValue(duration));
		case Duration.ThisWeek:
		case Duration.LastWeek:
			return getWeekSummary(getDurationValue(duration));
		default:
			return getYearSummary(getDurationValue(duration));
	}
}

async function getYearSummary(range: DateRange) {
	const userId = cookies().get("user")?.value;

	assert(userId);

	const summary = await prisma.expense.aggregateRaw({
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
						category: "$category",
						month: {
							$month: "$transactionDate",
						},
					},
					total: {
						$sum: "$amount",
					},
				},
			},
			{
				$addFields: {
					month: "$_id.month",
				},
			},
			{
				$project: {
					_id: 0,
					key: {
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
					amount: {
						$round: ["$total", 2],
					},
					category: "$_id.category",
					meta: {
						type: "month",
						index: {
							$subtract: ["$month", 1],
						},
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

	return summary as unknown as Data[];
}

async function getMonthSummary(range: DateRange) {
	const userId = cookies().get("user")?.value;

	assert(userId);

	const summary = await prisma.expense.aggregateRaw({
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
						category: "$category",
						week: {
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
					},
					total: {
						$sum: "$amount",
					},
				},
			},
			{
				$addFields: {
					week: "$_id.week",
				},
			},
			{
				$project: {
					_id: 0,
					key: {
						$switch: {
							branches: [
								{case: {$eq: ["$week", 1]}, then: "1st"},
								{case: {$eq: ["$week", 2]}, then: "2nd"},
								{case: {$eq: ["$week", 3]}, then: "3rd"},
								{case: {$eq: ["$week", 4]}, then: "4th"},
								{case: {$eq: ["$week", 5]}, then: "5th"},
								{case: {$eq: ["$week", 6]}, then: "6th"},
							],
						},
					},
					amount: {
						$round: ["$total", 2],
					},
					category: "$_id.category",
					meta: {
						type: "week",
						index: "$week",
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

	return summary as unknown as Data[];
}

async function getWeekSummary(range: DateRange) {
	const userId = cookies().get("user")?.value;

	assert(userId);

	const summary = await prisma.expense.aggregateRaw({
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
						category: "$category",
						dayOfWeek: {
							$dayOfWeek: "$transactionDate",
						},
					},
					total: {
						$sum: "$amount",
					},
				},
			},
			{
				$addFields: {
					day: "$_id.dayOfWeek",
				},
			},
			{
				$project: {
					_id: 0,
					key: {
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
					amount: {
						$round: ["$total", 2],
					},
					category: "$_id.category",
					meta: {
						type: "day",
						index: "$day",
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

	return summary as unknown as Data[];
}
