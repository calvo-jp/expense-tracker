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
import {cookies} from 'next/headers';
import assert from 'node:assert';
import {Logo} from '../logo';
import {ChangePassword} from './change-password';
import {Notifications} from './notifications';
import {Signout} from './sign-out';

export async function Navbar() {
	return (
		<>
			<styled.header
				h="navbar.height"
				w="full"
				px={8}
				bg="bg.canvas"
				pos="fixed"
				display="flex"
				alignItems="center"
				borderBottomWidth="1px"
			>
				<Logo />
				<Spacer />
				<Flex gap={4}>
					<Notifications />
					<ProfileMenu />
				</Flex>
			</styled.header>

			<Box h="navbar.height" />
		</>
	);
}

async function ProfileMenu() {
	const id = cookies().get('user')?.value;
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
