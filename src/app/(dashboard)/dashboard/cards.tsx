import {Icon} from "@/components/icon";
import {Box, Flex, styled} from "@/styled-system/jsx";
import {CoinsIcon, FoldersIcon} from "lucide-react";
import {ReactNode} from "react";

export function Cards() {
	return (
		<Flex gap={5}>
			<Card icon={<CoinsIcon />} label="Total Expenses" content="1.2M" />
			<Card icon={<FoldersIcon />} label="Total Records Added" content="1M" />
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
