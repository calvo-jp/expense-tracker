import "@/assets/styles/globals.css";
import {Toaster} from "@/components/toaster";
import {cx} from "@/styled-system/css";
import {styled} from "@/styled-system/jsx";
import {Metadata} from "next";
import {Lato, Open_Sans} from "next/font/google";
import {PropsWithChildren} from "react";
import {Providers} from "./providers";

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

export default function RootLayout({children}: PropsWithChildren) {
	return (
		<styled.html
			lang="en"
			scrollBehavior="smooth"
			className={cx(body.variable, heading.variable)}
			colorScheme="dark"
		>
			<styled.body fontFamily="body">
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</styled.body>
		</styled.html>
	);
}
