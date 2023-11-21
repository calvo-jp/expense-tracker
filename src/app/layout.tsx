import './globals.css';

import {Toaster} from '@/components/toaster';
import {cx} from '@/styled-system/css';
import {styled} from '@/styled-system/jsx';
import {Metadata} from 'next';
import {Lato} from 'next/font/google';
import {Providers} from './providers';

export const metadata: Metadata = {
	title: {
		default: 'Expense Tracker',
		template: 'Expense Tracker | %s',
	},
};

const sans = Lato({
	weight: ['400', '700'],
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-sans',
});

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<styled.html
			lang="en"
			scrollBehavior="smooth"
			className={cx(sans.variable, 'dark')}
		>
			<styled.body fontFamily="sans">
				<Providers>{children}</Providers>
				<Toaster />
			</styled.body>
		</styled.html>
	);
}
