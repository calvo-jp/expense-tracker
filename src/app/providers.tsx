"use client";

import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "next-themes";
import {PropsWithChildren} from "react";

export function Providers(props: PropsWithChildren) {
	return (
		<ThemeProvider
			attribute="class"
			storageKey="expense-tracker.theme"
			defaultTheme="system"
			disableTransitionOnChange
		>
			<SessionProvider>{props.children}</SessionProvider>
		</ThemeProvider>
	);
}
