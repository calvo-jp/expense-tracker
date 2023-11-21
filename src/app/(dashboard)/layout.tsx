import {Fragment, PropsWithChildren} from 'react';

export default function Layout(props: PropsWithChildren) {
	return <Fragment>{props.children}</Fragment>;
}
