import {Icon} from "@/components/icon";
import {prisma} from "@/config/prisma";
import {Flex} from "@/styled-system/jsx";
import assert from "assert";
import {CoinsIcon, FoldersIcon, TrendingUpIcon, WalletIcon} from "lucide-react";
import {cookies} from "next/headers";
import {Card, CardContent, CardHeading, CardIcon, CardLabel} from "./card";
import {Duration, getDurationValue} from "./utils";

interface CardsProps {
	duration: Duration;
}

export async function Cards(props: CardsProps) {
	const userId = cookies().get("user")?.value;

	assert(userId);

	const {start, until} = getDurationValue(props.duration);

	const aggregrate = await prisma.expense.aggregate({
		_count: {
			id: true,
		},
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
		<Flex gap={5} overflowX="auto" pb={5}>
			<Card bgGradient="to-r" gradientFrom="amber.a5" gradientTo="orange.a5">
				<CardIcon>
					<Icon>
						<WalletIcon />
					</Icon>
				</CardIcon>
				<CardContent>
					<CardLabel>Total Expenses</CardLabel>
					<CardHeading mt={2}>
						{abbreviateNumber(aggregrate._sum.amount ?? 0)}
					</CardHeading>
				</CardContent>
			</Card>
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
			<Card bgGradient="to-r" gradientFrom="red.a5" gradientTo="ruby.a5">
				<CardIcon>
					<Icon>
						<CoinsIcon />
					</Icon>
				</CardIcon>
				<CardContent>
					<CardLabel>Most Expensive</CardLabel>
					<CardHeading mt={2}>{0}</CardHeading>
				</CardContent>
			</Card>
			<Card bgGradient="to-r" gradientFrom="plum.a5" gradientTo="purple.a5">
				<CardIcon>
					<Icon>
						<FoldersIcon />
					</Icon>
				</CardIcon>
				<CardContent>
					<CardLabel>Total Records</CardLabel>
					<CardHeading mt={2}>
						{abbreviateNumber(aggregrate._count.id ?? 0)}
					</CardHeading>
				</CardContent>
			</Card>
		</Flex>
	);
}

function abbreviateNumber(value: number) {
	return new Intl.NumberFormat("en-US", {
		notation: "compact",
		compactDisplay: "short",
	}).format(value);
}
