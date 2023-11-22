import {Icon} from '@/components/icon';
import {Link} from '@/components/link';
import {styled} from '@/styled-system/jsx';
import {
	CoinsIcon,
	FilePieChartIcon,
	LineChartIcon,
	PowerIcon,
	SettingsIcon,
} from 'lucide-react';

export function Sidebar() {
	return (
		<styled.nav
			w="var(--sidebar-width)"
			h="calc(100vh - var(--navbar-height))"
			flexShrink={0}
			borderRightWidth="1px"
		>
			<styled.ul py={6}>
				{links.map((link) => (
					<styled.li key={link.path}>
						<Link
							href={link.path}
							css={{
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
								_selected: {
									color: 'amber.light.a10',
								},
							}}
						>
							<Icon>{link.icon}</Icon>
							<styled.span>{link.label}</styled.span>
						</Link>
					</styled.li>
				))}
			</styled.ul>
		</styled.nav>
	);
}

const links = [
	{
		icon: <LineChartIcon />,
		path: '/dashboard',
		label: 'Dashboard',
	},
	{
		icon: <CoinsIcon />,
		path: '/expenses',
		label: 'Expenses',
	},
	{
		icon: <FilePieChartIcon />,
		path: '/reports',
		label: 'Reports',
	},
	{
		icon: <SettingsIcon />,
		path: '/settings',
		label: 'Settings',
	},
	{
		icon: <PowerIcon />,
		path: '/signout',
		label: 'Sign out',
	},
];
