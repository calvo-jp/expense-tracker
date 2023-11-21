'use client';

import {SessionProvider} from 'next-auth/react';
import {PropsWithChildren} from 'react';

export function Providers(props: PropsWithChildren) {
	return <SessionProvider>{props.children}</SessionProvider>;
}
