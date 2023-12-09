import {Spinner} from "@/app/spinner";
import {Icon} from "@/components/icon";
import {prisma} from "@/config/prisma";
import {Box, Flex} from "@/styled-system/jsx";
import {pascalToSentenceCase} from "@/utils/pascal-to-sentence-case";
import {ExpenseCategory} from "@prisma/client";
import assert from "assert";
import {CoinsIcon, FoldersIcon, TrendingUpIcon, WalletIcon} from "lucide-react";
import {cookies} from "next/headers";
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
	const userId = cookies().get("user")?.value;

	assert(userId);

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
				<CardHeading mt={2}>{abbreviateNumber(_sum.amount ?? 0)}</CardHeading>
			</CardContent>
		</Card>
	);
}

async function TotalRecords({duration}: {duration: Duration}) {
	const userId = cookies().get("user")?.value;

	assert(userId);

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
				<CardHeading mt={2}>{abbreviateNumber(_count.id ?? 0)}</CardHeading>
			</CardContent>
		</Card>
	);
}

async function MostExpensive({duration}: {duration: Duration}) {
	const userId = cookies().get("user")?.value;

	assert(userId);

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
				<Box mt={2} flexGrow={1}>
					<CardHeading fontSize="2xl">
						{o ? pascalToSentenceCase(o.category) : "NA"}
					</CardHeading>
					<Box
						mt={1}
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
	return (
		<Card bgGradient="to-r" gradientFrom="lime.7" gradientTo="mint.7">
			<CardIcon>
				<Icon>
					<TrendingUpIcon />
				</Icon>
			</CardIcon>
			<CardContent>
				<CardLabel>vs. Last Month</CardLabel>
				<CardHeading mt={2}>{0}</CardHeading>
			</CardContent>
		</Card>
	);
}

function abbreviateNumber(value: number) {
	return new Intl.NumberFormat("en-US", {
		notation: "compact",
		compactDisplay: "short",
	}).format(value);
}
