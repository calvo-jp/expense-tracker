import {Box, styled} from '@/styled-system/jsx';
import {Metadata} from 'next';

export const metadata: Metadata = {
	title: 'Settings',
};

export default function Settings() {
	return (
		<Box>
			<styled.h1 fontFamily="heading" textStyle="3xl" fontWeight="bold">
				Settings
			</styled.h1>
		</Box>
	);
}
