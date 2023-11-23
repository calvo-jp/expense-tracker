import {Icon} from '@/components/icon';
import {Link} from '@/components/link';
import {Box, styled} from '@/styled-system/jsx';
import {
	CoinsIcon,
	FilePieChartIcon,
	LineChartIcon,
	SettingsIcon,
} from 'lucide-react';
import {Fragment} from 'react';

export function Sidebar() {
	return (
		<Fragment>
			<styled.nav
				w="sidebar.width"
				h="calc(100vh - token(sizes.navbar.height))"
				bg="bg.canvas"
				top="token(sizes.navbar.height)"
				pos="fixed"
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

			<Box id="sidebar-placeholder" w="sidebar.width" />
		</Fragment>
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
];
