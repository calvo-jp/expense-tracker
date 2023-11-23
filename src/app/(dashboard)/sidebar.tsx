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
			w="sidebar.width"
			h="calc(100vh - token(sizes.navbar.height))"
			flexShrink={0}
			borderRightWidth="1px"
		>
			<styled.ul py={6} px={4}>
				{links.map((link) => (
					<styled.li key={link.path}>
						<Link
							href={link.path}
							css={{
								w: 'full',
								px: 4,
								py: 2.5,
								color: 'fg.muted',
								cursor: 'pointer',
								rounded: 'sm',
								display: 'flex',
								alignItems: 'center',
								gap: 3,
								_hover: {
									color: 'fg.default',
								},
								_selected: {
									color: 'fg.default',
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
