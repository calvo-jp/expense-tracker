import {Avatar, AvatarFallback} from '@/components/avatar';
import {
	Drawer,
	DrawerBackdrop,
	DrawerBody,
	DrawerCloseTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerPositioner,
	DrawerTrigger,
} from '@/components/drawer';
import {Icon} from '@/components/icon';
import {IconButton} from '@/components/icon-button';
import {
	Menu,
	MenuContent,
	MenuItemGroup,
	MenuPositioner,
	MenuTrigger,
} from '@/components/menu';
import {Box, Flex, Spacer, styled} from '@/styled-system/jsx';
import {getUser} from '@/utils/user';
import {Portal} from '@ark-ui/react';
import assert from 'assert';
import {BellIcon, ChevronRightIcon} from 'lucide-react';
import {cookies} from 'next/headers';
import {Fragment} from 'react';
import {ChangePassword} from './change-password';

export async function Navbar() {
	return (
		<Fragment>
			<styled.header
				h="navbar.height"
				w="full"
				bg="bg.canvas"
				pos="fixed"
				borderBottomWidth="1px"
			>
				<Flex h="full" px={8} alignItems="center">
					<Spacer />
					<Flex gap={4}>
						<Notifications />
						<ProfileMenu />
					</Flex>
				</Flex>
			</styled.header>

			<Box id="navbar-placeholder" h="navbar.height" />
		</Fragment>
	);
}

async function ProfileMenu() {
	const cookieStore = cookies();
	const id = cookieStore.get('user')?.value;
	assert(id);
	const user = await getUser({id});

	return (
		<Menu
			lazyMount
			positioning={{
				flip: true,
				placement: 'bottom-end',
			}}
		>
			<MenuTrigger asChild>
				<styled.button cursor="pointer">
					<Avatar>
						<AvatarFallback>
							{user.username.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</styled.button>
			</MenuTrigger>

			<MenuPositioner>
				<MenuContent w="14rem" shadow="none" borderWidth="1px">
					<MenuItemGroup id="profile-settings-menu">
						<ChangePassword />
					</MenuItemGroup>
				</MenuContent>
			</MenuPositioner>
		</Menu>
	);
}

function Notifications() {
	return (
		<Drawer lazyMount>
			<DrawerTrigger asChild>
				<IconButton variant="ghost">
					<Icon w={6} h={6}>
						<BellIcon />
					</Icon>
				</IconButton>
			</DrawerTrigger>
			<Portal>
				<DrawerBackdrop />
				<DrawerPositioner>
					<DrawerContent>
						<DrawerHeader p={0}>
							<Flex h="navbar.height" pr={4} pl={6} gap={2} alignItems="center">
								<DrawerCloseTrigger asChild>
									<IconButton variant="outline">
										<Icon>
											<ChevronRightIcon />
										</Icon>
									</IconButton>
								</DrawerCloseTrigger>
							</Flex>
						</DrawerHeader>
						<DrawerBody></DrawerBody>
					</DrawerContent>
				</DrawerPositioner>
			</Portal>
		</Drawer>
	);
}
