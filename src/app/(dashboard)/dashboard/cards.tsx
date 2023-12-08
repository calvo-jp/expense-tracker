import {Icon} from "@/components/icon";
import {prisma} from "@/config/prisma";
import {Box, Flex, FlexProps, styled} from "@/styled-system/jsx";
import {Assign} from "@/styled-system/types";
import assert from "assert";
import {
	CoinsIcon,
	DollarSignIcon,
	FoldersIcon,
	TrendingUpIcon,
} from "lucide-react";
import {cookies} from "next/headers";
import {ReactNode} from "react";
import {Duration, getDurationValue} from "./utils";

interface CardsProps {
	duration: Duration;
}

//
// TODO
// - most expensive
// - comparison ie. vs last year/month/week
//

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
			<Card
				icon={<CoinsIcon />}
				label="Total Expenses"
				value={aggregrate._sum.amount ?? 0}
				bgGradient="to-r"
				gradientFrom="amber.a5"
				gradientTo="orange.a5"
			/>
			<Card
				icon={<FoldersIcon />}
				label="Total Records Added"
				value={aggregrate._count.id ?? 0}
				bgGradient="to-r"
				gradientFrom="plum.a5"
				gradientTo="purple.a5"
			/>
			<Card
				icon={<TrendingUpIcon />}
				label="Vs. Last Month"
				value={0}
				bgGradient="to-r"
				gradientFrom="lime.a5"
				gradientTo="mint.a5"
			/>
			<Card
				icon={<DollarSignIcon />}
				label="Most expensive"
				value={0}
				bgGradient="to-r"
				gradientFrom="red.a5"
				gradientTo="ruby.a5"
			/>
		</Flex>
	);
}

interface CardProps {
	icon: ReactNode;
	label: ReactNode;
	value: number;
}

function Card({icon, label, value, ...props}: Assign<FlexProps, CardProps>) {
	return (
		<Flex
			w="18.5rem"
			h="10.5rem"
			p={10}
			alignItems="center"
			gap={8}
			flexShrink={0}
			{...props}
		>
			<Icon w={10} h={10}>
				{icon}
			</Icon>

			<Box>
				<styled.div color="fg.muted" fontSize="sm">
					{label}
				</styled.div>
				<styled.div
					mt={2}
					fontFamily="heading"
					fontSize="4xl"
					fontWeight="bold"
					lineHeight="none"
				>
					{abbreviateNumber(value)}
				</styled.div>
			</Box>
		</Flex>
	);
}

function abbreviateNumber(value: number) {
	return new Intl.NumberFormat("en-US", {
		notation: "compact",
		compactDisplay: "short",
	}).format(value);
}
