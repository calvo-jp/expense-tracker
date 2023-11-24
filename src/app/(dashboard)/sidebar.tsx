import {Icon} from '@/components/icon';
import {Link} from '@/components/link';
import {Box, styled} from '@/styled-system/jsx';
import {ark} from '@ark-ui/react';
import {
	CoinsIcon,
	FilePieChartIcon,
	LineChartIcon,
	PowerIcon,
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
					<styled.li>
						<SidebarButton asChild>
							<Link href="/dashboard">
								<Icon>
									<LineChartIcon />
								</Icon>
								<styled.span>Dashboard</styled.span>
							</Link>
						</SidebarButton>
					</styled.li>
					<styled.li>
						<SidebarButton asChild>
							<Link href="/expenses">
								<Icon>
									<CoinsIcon />
								</Icon>
								<styled.span>Expenses</styled.span>
							</Link>
						</SidebarButton>
					</styled.li>
					<styled.li>
						<SidebarButton asChild>
							<Link href="/reports">
								<Icon>
									<FilePieChartIcon />
								</Icon>
								<styled.span>Reports</styled.span>
							</Link>
						</SidebarButton>
					</styled.li>
					<styled.li>
						<styled.form
							action={async () => {
								'use server';

								const cookieStore = cookies();
								cookieStore.delete('user');
								redirect('/');
							}}
						>
							<SidebarButton type="submit">
								<Icon>
									<PowerIcon />
								</Icon>
								<styled.span>Sign out</styled.span>
							</SidebarButton>
						</styled.form>
					</styled.li>
				</styled.ul>
			</styled.nav>

			<Box id="sidebar-placeholder" w="sidebar.width" />
		</Fragment>
	);
}

const SidebarButton = styled(
	ark.button,
	{
		base: {
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
		},
	},
	{
		defaultProps: {
			type: 'submit',
		},
	},
);
