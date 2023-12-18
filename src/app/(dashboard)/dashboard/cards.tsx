import {Spinner} from "@/app/spinner";
import {Icon} from "@/components/icon";
import {authOptions} from "@/config/auth-options";
import {prisma} from "@/config/prisma";
import {Box, Flex} from "@/styled-system/jsx";
import {formatNumber} from "@/utils/format-number";
import {pascalToSentenceCase} from "@/utils/pascal-to-sentence-case";
import {ExpenseCategory} from "@prisma/client";
import assert from "assert";
import {
	endOfMonth,
	endOfWeek,
	endOfYear,
	format,
	isSameMonth,
	startOfMonth,
	startOfWeek,
	startOfYear,
	subMonths,
	subWeeks,
	subYears,
} from "date-fns";
import {CoinsIcon, FoldersIcon, TrendingUpIcon, WalletIcon} from "lucide-react";
import {getServerSession} from "next-auth";
import {Suspense} from "react";
import {Card, CardContent, CardHeading, CardIcon, CardLabel} from "./card";
import {Duration, getDurationValue} from "./utils";

interface CardsProps {
	duration: Duration;
}

export async function Cards(props: CardsProps) {
	return (
		<Flex
			pos="relative"
			pb={4}
			gap={5}
			overflowX="auto"
			scrollSnapType="x mandatory"
			scrollBehavior="smooth"
		>
			<Suspense fallback={<CardSkeleton />}>
				<TotalExpenses duration={props.duration} />
			</Suspense>
			<Suspense fallback={<CardSkeleton />}>
				<Comparison duration={props.duration} />
			</Suspense>
			<Suspense fallback={<CardSkeleton />}>
				<MostExpensive duration={props.duration} />
			</Suspense>
			<Suspense fallback={<CardSkeleton />}>
				<TotalRecords duration={props.duration} />
			</Suspense>
		</Flex>
	);
}

function CardSkeleton() {
	return (
		<Card
			bg="gray.a2"
			border="1px solid token(colors.gray.a4)"
			rounded="sm"
			alignItems="center"
			justifyContent="center"
		>
			<Spinner w={7} h={7} />
		</Card>
	);
}

async function TotalExpenses({duration}: {duration: Duration}) {
	const session = await getServerSession(authOptions);

	assert(session);

	const userId = session.user.id;
	const {start, until} = getDurationValue(duration);

	const {_sum} = await prisma.expense.aggregate({
		_sum: {
			amount: true,
		},
		where: {
			userId,
			transactionDate: {
				gte: start,
				lte: until,
			},
		},
	});

	return (
		<Card bgGradient="to-r" gradientFrom="amber.7" gradientTo="orange.7">
			<CardIcon>
				<Icon>
					<WalletIcon />
				</Icon>
			</CardIcon>
			<CardContent>
				<CardLabel>Total Expenses</CardLabel>
				<CardHeading>{abbreviateNumber(_sum.amount ?? 0)}</CardHeading>
			</CardContent>
		</Card>
	);
}

async function TotalRecords({duration}: {duration: Duration}) {
	const session = await getServerSession(authOptions);

	assert(session);

	const userId = session.user.id;
	const {start, until} = getDurationValue(duration);

	const {_count} = await prisma.expense.aggregate({
		_count: {
			id: true,
		},
		where: {
			userId,
			transactionDate: {
				gte: start,
				lte: until,
			},
		},
	});

	return (
		<Card bgGradient="to-r" gradientFrom="plum.7" gradientTo="purple.7">
			<CardIcon>
				<Icon>
					<FoldersIcon />
				</Icon>
			</CardIcon>
			<CardContent>
				<CardLabel>Total Records</CardLabel>
				<CardHeading>{abbreviateNumber(_count.id ?? 0)}</CardHeading>
			</CardContent>
		</Card>
	);
}

async function MostExpensive({duration}: {duration: Duration}) {
	const session = await getServerSession(authOptions);

	assert(session);

	const userId = session.user.id;
	const {start, until} = getDurationValue(duration);

	const l = await prisma.expense.aggregateRaw({
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
											dateString: start,
										},
									},
								],
							},
							{
								$lte: [
									"$transactionDate",
									{
										$dateFromString: {
											dateString: until,
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
					_id: "$category",
					total: {
						$sum: "$amount",
					},
				},
			},
			{
				$project: {
					_id: 0,
					category: "$_id",
					amount: {
						$round: ["$total", 2],
					},
				},
			},
			{
				$sort: {
					amount: -1,
				},
			},
			{
				$limit: 1,
			},
		],
	});

	const c = l as unknown as {category: ExpenseCategory; amount: number}[];
	const o = c?.at(0);

	return (
		<Card bgGradient="to-r" gradientFrom="tomato.7" gradientTo="ruby.7">
			<CardIcon>
				<Icon>
					<CoinsIcon />
				</Icon>
			</CardIcon>
			<CardContent>
				<CardLabel>Most Expensive</CardLabel>
				<Box mt={1} flexGrow={1}>
					<CardHeading fontSize="2xl">
						{o ? pascalToSentenceCase(o.category) : "NA"}
					</CardHeading>
					<Box
						fontFamily="mono"
						fontSize="sm"
						color={{
							base: "white.a8",
							_light: "black.a8",
						}}
					>
						Total: {abbreviateNumber(o?.amount ?? 0)}
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}

async function Comparison({duration}: {duration: Duration}) {
	const session = await getServerSession(authOptions);

	assert(session);

	const userId = session.user.id;

	const {range, expr, label} = getComparisonHelpers(duration);
	const {start, until} = range;

	const l = await prisma.expense.aggregateRaw({
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
											dateString: start,
										},
									},
								],
							},
							{
								$lte: [
									"$transactionDate",
									{
										$dateFromString: {
											dateString: until,
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
						[expr]: "$transactionDate",
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
						$toString: "$_id",
					},
					value: {
						$round: ["$total", 2],
					},
				},
			},
		],
	});

	const c = l as unknown as {key: string; value: number}[];
	const p = c.length < 2 ? 0 : getPercentChange(c[1].value, c[0].value);

	return (
		<Card bgGradient="to-r" gradientFrom="lime.7" gradientTo="mint.7">
			<CardIcon>
				<Icon>
					<TrendingUpIcon />
				</Icon>
			</CardIcon>
			<CardContent>
				<CardLabel>vs {label}</CardLabel>
				<CardHeading>{formatNumber(p)}%</CardHeading>
			</CardContent>
		</Card>
	);
}

function getPercentChange(oldValue: number, newValue: number) {
	return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
}

function getComparisonHelpers(duration: Duration) {
	let t = new Date();

	let s: Date;
	let u: Date;

	let e: string;
	let l: string;

	if (duration === Duration.ThisYear) {
		s = subYears(startOfYear(t), 1);
		u = endOfYear(t);
		e = "$year";
		l = "Last Year";
	} else if (duration === Duration.LastYear) {
		s = subYears(startOfYear(t), 2);
		u = subYears(endOfYear(t), 1);
		e = "$year";
		l = format(s, "yyyy");
	} else if (duration === Duration.ThisMonth) {
		s = subMonths(startOfMonth(t), 1);
		u = endOfMonth(t);
		e = "$month";
		l = "Last Month";
	} else if (duration === Duration.LastMonth) {
		s = subMonths(startOfMonth(t), 2);
		u = subMonths(endOfMonth(t), 1);
		e = "$month";
		l = format(s, "MMMM");
	} else if (duration === Duration.ThisWeek) {
		s = subWeeks(startOfWeek(t), 1);
		u = endOfWeek(t);
		e = "$week";
		l = "Last Week";
	} else {
		s = subWeeks(startOfWeek(t), 2);
		u = subWeeks(endOfWeek(t), 1);
		e = "$week";
		l = isSameMonth(s, endOfWeek(s))
			? `${format(s, "MMM dd")} - ${format(endOfWeek(s), "dd")}`
			: `${format(s, "MMM dd")} - ${format(endOfWeek(s), "MMM dd")}`;
	}

	return {
		today: t,
		label: l,
		expr: e,
		range: {
			start: s,
			until: u,
		},
	};
}

function abbreviateNumber(value: number) {
	return new Intl.NumberFormat("en-US", {
		notation: "compact",
		compactDisplay: "short",
	}).format(value);
}
