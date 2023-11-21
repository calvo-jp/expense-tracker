import {Icon} from '@/components/icon';
import {css} from '@/styled-system/css';
import {styled} from '@/styled-system/jsx';
import {
	CoinsIcon,
	FilePieChartIcon,
	LineChartIcon,
	PowerIcon,
	SettingsIcon,
} from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
	return (
		<styled.nav
			w="var(--sidebar-width)"
			h="calc(100vh - var(--navbar-height))"
			flexShrink={0}
			borderRightWidth="1px"
		>
			<styled.ul py={6}>
				<styled.li>
					<Link href="/dashboard" className={linkCls}>
						<Icon>
							<LineChartIcon />
						</Icon>
						<styled.span>Dashboard</styled.span>
					</Link>
				</styled.li>
				<styled.li>
					<Link href="/expenses" className={linkCls}>
						<Icon>
							<CoinsIcon />
						</Icon>
						<styled.span>Expenses</styled.span>
					</Link>
				</styled.li>
				<styled.li>
					<Link href="/reports" className={linkCls}>
						<Icon>
							<FilePieChartIcon />
						</Icon>
						<styled.span>Reports</styled.span>
					</Link>
				</styled.li>
				<styled.li>
					<Link href="/settings" className={linkCls}>
						<Icon>
							<SettingsIcon />
						</Icon>
						<styled.span>Settings</styled.span>
					</Link>
				</styled.li>
				<styled.li>
					<styled.button className={linkCls}>
						<Icon>
							<PowerIcon />
						</Icon>
						<styled.span>Sign out</styled.span>
					</styled.button>
				</styled.li>
			</styled.ul>
		</styled.nav>
	);
}

const linkCls = css({
	w: 'full',
	px: 8,
	py: 2.5,
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	gap: 3,
	_hover: {
		bg: 'bg.subtle',
	},
});
