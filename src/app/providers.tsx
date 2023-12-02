"use client";

import {ThemeProvider} from "next-themes";
import {PropsWithChildren} from "react";

export function Providers(props: PropsWithChildren) {
	return (
		<ThemeProvider
			attribute="class"
			storageKey="expense-tracker.theme"
			defaultTheme="system"
			enableSystem
			enableColorScheme
			disableTransitionOnChange
		>
			{props.children}
		</ThemeProvider>
	);
}
