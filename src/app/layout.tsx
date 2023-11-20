import {Toaster} from '@/components/toaster';
import {cx} from '@/styled-system/css';
import {styled} from '@/styled-system/jsx';
import {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
	title: 'Budget Tracker',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<styled.html lang="en" className={cx(inter.className, 'dark')}>
			<styled.body>
				{children}
				<Toaster />
			</styled.body>
		</styled.html>
	);
}
