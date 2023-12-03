import {Box, Flex, styled} from "@/styled-system/jsx";
import {ReactNode} from "react";

export function Cards() {
	return (
		<Flex gap={5}>
			<Card label="Total Expenses" content="1.2M" />
			<Card label="Total Records" content="1M" />
		</Flex>
	);
}

function Card({label, content}: {label: ReactNode; content: ReactNode}) {
	return (
		<Box
			w="16rem"
			p={10}
			alignItems="center"
			rounded="sm"
			bg="neutral.a2"
			border="1px solid token(colors.neutral.a4)"
		>
			<styled.div color="fg.muted" fontSize="sm">
				{label}
			</styled.div>
			<styled.div
				mt={2}
				fontFamily="mono"
				fontSize="4xl"
				fontWeight="bold"
				lineHeight="none"
			>
				{content}
			</styled.div>
		</Box>
	);
}
