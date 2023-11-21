import './globals.css';

import {Toaster} from '@/components/toaster';
import {cx} from '@/styled-system/css';
import {styled} from '@/styled-system/jsx';
import {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Providers} from './providers';

const sans = Inter({
	weight: ['400', '500', '600', '700'],
	display: 'swap',
	subsets: ['latin'],
	preload: true,
	variable: '--font-sans',
});

const mono = Inter({
	weight: '400',
	display: 'swap',
	subsets: ['latin'],
	preload: true,
	variable: '--font-mono',
});

export const metadata: Metadata = {
	title: {
		default: 'Expense Tracker',
		template: 'Expense Tracker | %s',
	},
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<styled.html
			lang="en"
			scrollBehavior="smooth"
			className={cx(sans.variable, mono.variable)}
		>
			<styled.body fontFamily="sans">
				<Providers>{children}</Providers>
				<Toaster />
			</styled.body>
		</styled.html>
	);
}
