import {styled} from '@/styled-system/jsx';
import {Fragment, PropsWithChildren} from 'react';

export default function Layout(props: PropsWithChildren) {
	return (
		<Fragment>
			<styled.main maxW="22rem" mx="auto" py={24}>
				{props.children}
			</styled.main>
		</Fragment>
	);
}
