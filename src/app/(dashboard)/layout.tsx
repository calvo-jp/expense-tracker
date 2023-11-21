import {Box, Flex, styled} from '@/styled-system/jsx';
import {PropsWithChildren} from 'react';
import {Navbar} from './navbar';
import {Sidebar} from './sidebar';

export default function Layout(props: PropsWithChildren) {
	return (
		<Box
			h="100vh"
			css={{
				'--navbar-height': 'token(spacing.20)',
				'--sidebar-width': 'token(spacing.64)',
			}}
		>
			<Navbar />
			<Flex alignItems="flex-start">
				<Sidebar />
				<styled.main
					p={8}
					h="calc(100vh - var(--navbar-height))"
					flexGrow={1}
					overflowY="auto"
				>
					{props.children}
				</styled.main>
			</Flex>
		</Box>
	);
}
