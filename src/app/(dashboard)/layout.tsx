import {Box, Flex, styled} from '@/styled-system/jsx';
import {PropsWithChildren} from 'react';
import {Navbar} from './navbar';
import {Sidebar} from './sidebar';

export default function Layout(props: PropsWithChildren) {
	return (
		<Box h="100vh" minW="breakpoint-lg">
			<Navbar />
			<Flex alignItems="flex-start">
				<Sidebar />

				<styled.main
					p={10}
					h="calc(100vh - token(sizes.navbar.height))"
					bg="bg.default"
					flexGrow={1}
					overflowY="auto"
				>
					{props.children}
				</styled.main>
			</Flex>
		</Box>
	);
}
