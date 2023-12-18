"use client";

import {Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "next-themes";
import {PropsWithChildren} from "react";

interface ProvidersProps {
	session?: Session | null;
}

export function Providers({
	session,
	children,
}: PropsWithChildren<ProvidersProps>) {
	return (
		<ThemeProvider
			attribute="class"
			storageKey="expense-tracker.theme"
			defaultTheme="system"
			disableTransitionOnChange
		>
			<SessionProvider session={session}>{children}</SessionProvider>
		</ThemeProvider>
	);
}
