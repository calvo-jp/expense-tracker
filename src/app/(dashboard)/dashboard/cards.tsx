import {Icon} from "@/components/icon";
import {prisma} from "@/config/prisma";
import {Box, Circle, Flex, HStack, styled} from "@/styled-system/jsx";
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
		<Flex gap={5} overflowX="auto" pb={5}>
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
	return null;
}

async function TotalExpenses({duration}: {duration: Duration}) {
	const userId = cookies().get("user")?.value;

	assert(userId);

	const {start, until} = getDurationValue(duration);

	const data = await prisma.expense.aggregate({
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
		<Card bgGradient="to-r" gradientFrom="amber.a5" gradientTo="orange.a5">
			<CardIcon>
				<Icon>
					<WalletIcon />
				</Icon>
			</CardIcon>
			<CardContent>
				<CardLabel>Total Expenses</CardLabel>
				<CardHeading mt={2}>
					{abbreviateNumber(data._sum.amount ?? 0)}
				</CardHeading>
			</CardContent>
		</Card>
	);
}

async function TotalRecords({duration}: {duration: Duration}) {
	const userId = cookies().get("user")?.value;

	assert(userId);

	const {start, until} = getDurationValue(duration);

	const data = await prisma.expense.aggregate({
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
		<Card bgGradient="to-r" gradientFrom="plum.a5" gradientTo="purple.a5">
			<CardIcon>
				<Icon>
					<FoldersIcon />
				</Icon>
			</CardIcon>
			<CardContent>
				<CardLabel>Total Records</CardLabel>
				<CardHeading mt={2}>
					{abbreviateNumber(data._count.id ?? 0)}
				</CardHeading>
			</CardContent>
		</Card>
	);
}

async function MostExpensive({duration}: {duration: Duration}) {
	return (
		<Card bgGradient="to-r" gradientFrom="tomato.a5" gradientTo="ruby.a5">
			<CardIcon>
				<Icon>
					<CoinsIcon />
				</Icon>
			</CardIcon>
			<CardContent>
				<CardLabel>Most Expensive</CardLabel>
				<Box mt={2}>
					<CardHeading fontSize="2xl">
						{pascalToSentenceCase(ExpenseCategory.Food)}
					</CardHeading>
					<HStack
						mt={1}
						gap={1.5}
						fontFamily="mono"
						fontSize="sm"
						color={{
							base: "white.a8",
							_light: "black.a8",
						}}
					>
						<styled.span>{abbreviateNumber(255525)}</styled.span>
						<Circle
							w={1}
							h={1}
							bg={{
								base: "white.a4",
								_light: "black.a4",
							}}
						/>
						<styled.span>{formatPercent(0.25)}</styled.span>
					</HStack>
				</Box>
			</CardContent>
		</Card>
	);
}

async function Comparison({duration}: {duration: Duration}) {
	return (
		<Card bgGradient="to-r" gradientFrom="lime.a5" gradientTo="mint.a5">
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

function formatPercent(value: number) {
	return Intl.NumberFormat("en-US", {
		style: "percent",
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
	}).format(value);
}
