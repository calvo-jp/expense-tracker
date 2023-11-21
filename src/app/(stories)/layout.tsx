import {Metadata} from 'next';
import {Fragment, PropsWithChildren} from 'react';

export const metadata: Metadata = {
	title: 'Stories',
};

export default function Layout(props: PropsWithChildren) {
	return <Fragment>{props.children}</Fragment>;
}
