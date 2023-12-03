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
};

const body = Inter({
	weight: ["400", "500", "600", "700"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-body",
});

const heading = Open_Sans({
	weight: ["400", "500", "600", "700"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-heading",
});

const mono = JetBrains_Mono({
	weight: ["400", "500", "600", "700"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-mono",
});

export default function RootLayout({children}: PropsWithChildren) {
	return (
		<styled.html
			lang="en"
			scrollBehavior="smooth"
			className={cx(body.variable, heading.variable, mono.variable)}
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
