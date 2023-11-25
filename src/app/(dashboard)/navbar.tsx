import {Avatar, AvatarFallback} from '@/components/avatar';
import {
	Menu,
	MenuContent,
	MenuItemGroup,
	MenuPositioner,
	MenuTrigger,
} from '@/components/menu';
import {prisma} from '@/config/prisma';
import {Box, Flex, Spacer, styled} from '@/styled-system/jsx';
import assert from 'assert';
import {cookies} from 'next/headers';
import {ChangePassword} from './change-password';
import {Notifications} from './notifications';
import {Signout} from './sign-out';

export async function Navbar() {
	return (
		<>
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

			<Box h="navbar.height" />
		</>
	);
}

async function ProfileMenu() {
	const cookieStore = cookies();
	const id = cookieStore.get('user')?.value;
	assert(id);
	const user = await prisma.user.findUniqueOrThrow({where: {id}});

	return (
		<Menu
			lazyMount
			positioning={{
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
					<MenuItemGroup id="navbar.profile-settings">
						<ChangePassword />
						<Signout />
					</MenuItemGroup>
				</MenuContent>
			</MenuPositioner>
		</Menu>
	);
}
