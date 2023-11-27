import "./globals.css";

import {Toaster} from "@/components/toaster";
import {cx} from "@/styled-system/css";
import {styled} from "@/styled-system/jsx";
import {Metadata} from "next";
import {Lato, Open_Sans} from "next/font/google";

export const metadata: Metadata = {
	title: {
		default: "Expense Tracker",
		template: "Expense Tracker | %s",
	},
};

const body = Lato({
	weight: ["400", "700"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-body",
});

const heading = Open_Sans({
	weight: ["400", "700"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-heading",
});

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<styled.html
			lang="en"
			scrollBehavior="smooth"
			className={cx(body.variable, heading.variable, "dark")}
			colorScheme="dark"
		>
			<styled.body fontFamily="body">
				{children}
				<Toaster />
			</styled.body>
		</styled.html>
	);
}
