import {Icon} from '@/components/icon';
import {Link} from '@/components/link';
import {css} from '@/styled-system/css';
import {Box, styled} from '@/styled-system/jsx';
import {
	CoinsIcon,
	FilePieChartIcon,
	LineChartIcon,
	PowerIcon,
	SettingsIcon,
} from 'lucide-react';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
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
							<Link href={link.path} className={linkCls}>
								<Icon>{link.icon}</Icon>
								<styled.span>{link.label}</styled.span>
							</Link>
						</styled.li>
					))}

					<styled.li>
						<styled.form
							action={async () => {
								'use server';

								const cookieStore = cookies();
								cookieStore.delete('user');
								redirect('/');
							}}
						>
							<styled.button type="submit" className={linkCls}>
								<Icon>
									<PowerIcon />
								</Icon>
								<styled.span>Sign out</styled.span>
							</styled.button>
						</styled.form>
					</styled.li>
				</styled.ul>
			</styled.nav>

			<Box id="sidebar-placeholder" w="sidebar.width" />
		</Fragment>
	);
}

const linkCls = css({
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
});

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
