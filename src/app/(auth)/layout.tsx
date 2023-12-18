import {Box, Center, styled} from "@/styled-system/jsx";
import {PropsWithChildren} from "react";
import {Logo} from "../logo";

export default function Layout({children}: PropsWithChildren) {
	return (
		<styled.main
			maxW="22rem"
			mx="auto"
			px={4}
			py={{
				base: 24,
				lg: 32,
			}}
		>
			<Center>
				<Logo h={14} />
			</Center>
			<Box mt={16}>{children}</Box>
		</styled.main>
	);
}
