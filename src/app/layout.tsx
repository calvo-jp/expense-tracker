import "@/assets/styles/globals.css";
import {Toaster} from "@/components/toaster";
import {cx} from "@/styled-system/css";
import {styled} from "@/styled-system/jsx";
import {Metadata} from "next";
import {Inter, JetBrains_Mono, Open_Sans} from "next/font/google";
import {PropsWithChildren} from "react";
import {Providers} from "./providers";

export const metadata: Metadata = {
	title: {
		default: "Expense Tracker",
		template: "Expense Tracker | %s",
	},
	metadataBase: new URL("https://calvojp-expense-tracker.vercel.app"),
	openGraph: {
		title: "Spend wisely!",
		description:
			"Stay in control of your finances - effortlessly monitor daily expenses and gain valuable spending insights.",
	},
};

const body = Inter({
	weight: ["400", "500", "600", "700"],
	display: "swap",
	subsets: ["latin"],
	preload: true,
	variable: "--font-body",
});

const heading = Open_Sans({
	weight: ["400", "500", "600", "700", "800"],
	display: "swap",
	subsets: ["latin"],
	preload: true,
	variable: "--font-heading",
});

const mono = JetBrains_Mono({
	weight: ["400"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-mono",
});

export default async function RootLayout({children}: PropsWithChildren) {
	return (
		<styled.html
			lang="en"
			suppressHydrationWarning
			className={cx(body.variable, heading.variable, mono.variable)}
			scrollBehavior="smooth"
			colorScheme={{
				base: "dark",
				_light: "light",
			}}
		>
			<styled.body fontFamily="body">
				<Providers>{children}</Providers>
				<Toaster />
			</styled.body>
		</styled.html>
	);
}
