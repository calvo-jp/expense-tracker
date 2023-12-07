import {Icon} from "@/components/icon";
import {prisma} from "@/config/prisma";
import {Box, Flex, styled} from "@/styled-system/jsx";
import {abbreviateNumber} from "@/utils/abbreviate-number";
import assert from "assert";
import {CoinsIcon, FoldersIcon} from "lucide-react";
import {cookies} from "next/headers";
import {ReactNode} from "react";
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
		<Flex gap={5}>
			<Card
				icon={<CoinsIcon />}
				label="Total Expenses"
				content={abbreviateNumber(aggregrate._sum.amount ?? 0)}
			/>
			<Card
				icon={<FoldersIcon />}
				label="Total Records Added"
				content={abbreviateNumber(aggregrate._count.id ?? 0)}
			/>
		</Flex>
	);
}

interface CardProps {
	icon: ReactNode;
	label: ReactNode;
	content: ReactNode;
}

function Card({label, content, icon}: CardProps) {
	return (
		<Flex
			w="20rem"
			p={10}
			gap={8}
			alignItems="center"
			rounded="sm"
			bg="gray.a2"
			border="1px solid token(colors.gray.a4)"
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
					{content}
				</styled.div>
			</Box>
		</Flex>
	);
}
