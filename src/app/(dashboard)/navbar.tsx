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
	MenuItem,
	MenuItemGroup,
	MenuPositioner,
	MenuTrigger,
} from '@/components/menu';
import {Flex, HStack, Spacer, styled} from '@/styled-system/jsx';
import {Portal} from '@ark-ui/react';
import {BellIcon, ChevronRightIcon, LockIcon, PowerIcon} from 'lucide-react';

export function Navbar() {
	return (
		<styled.header h="navbar.height" borderBottomWidth="1px">
			<Flex h="full" px={8} alignItems="center">
				<Spacer />

				<Flex gap={4}>
					<Notifications />
					<ProfileMenu />
				</Flex>
			</Flex>
		</styled.header>
	);
}

function ProfileMenu() {
	return (
		<Menu
			positioning={{
				flip: true,
				placement: 'bottom-end',
			}}
		>
			<MenuTrigger asChild>
				<styled.button cursor="pointer">
					<Avatar>
						<AvatarFallback>JP</AvatarFallback>
					</Avatar>
				</styled.button>
			</MenuTrigger>

			<MenuPositioner>
				<MenuContent w="14rem" shadow="none" borderWidth="1px">
					<MenuItemGroup id="profile-settings-menu">
						<MenuItem id="profile-settings-menu--item-1">
							<HStack>
								<Icon>
									<LockIcon />
								</Icon>
								<styled.span>Change Password</styled.span>
							</HStack>
						</MenuItem>
						<MenuItem id="profile-settings-menu--item-2">
							<HStack>
								<Icon>
									<PowerIcon />
								</Icon>
								<styled.span>Sign out</styled.span>
							</HStack>
						</MenuItem>
					</MenuItemGroup>
				</MenuContent>
			</MenuPositioner>
		</Menu>
	);
}

function Notifications() {
	return (
		<Drawer>
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
							<Flex h="navbar.height" pr={4} pl={6} alignItems="center">
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
