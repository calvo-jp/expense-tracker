import {authOptions} from "@/config/auth-options";
import {prisma} from "@/config/prisma";
import {Box} from "@/styled-system/jsx";
import {ExpenseCategory} from "@prisma/client";
import assert from "assert";
import {getServerSession} from "next-auth";
import {BreakdownGraph} from "./breakdown-graph";
import {DateRange, Duration, getDurationValue} from "./utils";

interface BreakdownProps {
	duration: Duration;
}

export async function Breakdown(props: BreakdownProps) {
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
			<BreakdownGraph data={summary} />
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

export interface Data {
	key: string;
	amount: number;
	category: ExpenseCategory;
}

async function getYearSummary(range: DateRange) {
	const session = await getServerSession(authOptions);

	assert(session);

	const userId = session.user.id;

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
				},
			},
			{
				$sort: {
					index: 1,
				},
			},
		],
	});

	const s = summary as unknown as Data[];
	const l = [...MONTHS_PLACEHOLDER, ...s];

	return normalizeData(l);
}

async function getMonthSummary(range: DateRange) {
	const session = await getServerSession(authOptions);

	assert(session);

	const userId = session.user.id;

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
				$project: {
					_id: 0,
					key: {
						$concat: ["Week ", {$toString: "$_id.week"}],
					},
					amount: {
						$round: ["$total", 2],
					},
					category: "$_id.category",
				},
			},
			{
				$sort: {
					week: 1,
				},
			},
		],
	});

	const s = summary as unknown as Data[];
	const l = [...WEEKS_PLACEHOLDER, ...s];

	return normalizeData(l);
}

async function getWeekSummary(range: DateRange) {
	const session = await getServerSession(authOptions);

	assert(session);

	const userId = session.user.id;

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
				},
			},
			{
				$sort: {
					index: 1,
				},
			},
		],
	});

	const s = summary as unknown as Data[];
	const l = [...DAYS_PLACEHOLDER, ...s];

	return normalizeData(l);
}

const MONTHS_PLACEHOLDER = createPlaceholder([
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
]);
const WEEKS_PLACEHOLDER = createPlaceholder([
	"Week 1",
	"Week 2",
	"Week 3",
	"Week 4",
	"Week 5",
	"Week 6",
]);
const DAYS_PLACEHOLDER = createPlaceholder([
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
]);

function createPlaceholder<T extends string>(keys: T[]) {
	const amount = 0;

	return keys.reduce<Data[]>((arr, key) => {
		return [
			...arr,
			...Object.values(ExpenseCategory).map((category) => ({
				key,
				amount,
				category,
			})),
		];
	}, []);
}

function normalizeData(data: Data[]) {
	const val: Record<string, Partial<Record<ExpenseCategory, number>>> = {};

	data.forEach((obj) => {
		if (!val[obj.key]) {
			val[obj.key] = {};
		}

		val[obj.key][obj.category] = obj.amount;
	});

	return val as Record<string, Record<ExpenseCategory, number>>;
}
