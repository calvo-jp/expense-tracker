import './globals.css';

import {Toaster} from '@/components/toaster';
import {cx} from '@/styled-system/css';
import {styled} from '@/styled-system/jsx';
import {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Providers} from './providers';

const inter = Inter({
	weight: ['400', '500', '600', '700'],
	display: 'swap',
	subsets: ['latin'],
	preload: true,
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'Expense Tracker',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<styled.html lang="en" className={cx(inter.variable, 'dark')}>
			<styled.body fontFamily="sans">
				<Providers>{children}</Providers>
				<Toaster />
			</styled.body>
		</styled.html>
	);
}
