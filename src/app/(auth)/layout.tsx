import {styled} from '@/styled-system/jsx';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {Fragment, PropsWithChildren} from 'react';

export default function Layout(props: PropsWithChildren) {
	const cookieStore = cookies();

	if (cookieStore.has('user')) {
		redirect('/dashboard');
	}

	return (
		<Fragment>
			<styled.main maxW="22rem" mx="auto" py={24}>
				{props.children}
			</styled.main>
		</Fragment>
	);
}
