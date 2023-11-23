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
					bg="bg.default"
					minH="calc(100vh - token(sizes.navbar.height))"
					flexGrow={1}
				>
					{props.children}
				</styled.main>
			</Flex>
		</Box>
	);
}
