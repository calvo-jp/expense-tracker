import {Avatar, AvatarFallback} from "@/components/avatar";
import {
	Menu,
	MenuContent,
	MenuItemGroup,
	MenuPositioner,
	MenuSeparator,
	MenuTrigger,
} from "@/components/menu";
import {prisma} from "@/config/prisma";
import {Box, Flex, Spacer, styled} from "@/styled-system/jsx";
import {getInitials} from "@/utils/get-initials";
import {Portal} from "@ark-ui/react";
import assert from "assert";
import {cookies} from "next/headers";
import {Logo} from "../logo";
import {ChangePassword} from "./change-password";
import {Notifications} from "./notifications";
import {Signout} from "./sign-out";
import {UpdateProfile} from "./update-profile";

export async function Navbar() {
	return (
		<>
			<styled.header
				h="navbar.height"
				w="full"
				px={8}
				bg="bg.canvas"
				pos="fixed"
				zIndex="sticky"
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
	const id = cookies().get("user")?.value;

	assert(id);

	const user = await prisma.user.findUniqueOrThrow({where: {id}});

	return (
		<Menu
			positioning={{
				placement: "bottom-end",
			}}
		>
			<MenuTrigger asChild>
				<styled.button cursor="pointer">
					<Avatar>
						<AvatarFallback>
							{getInitials(user.name ?? user.username)}
						</AvatarFallback>
					</Avatar>
				</styled.button>
			</MenuTrigger>

			<Portal>
				<MenuPositioner>
					<MenuContent w="14rem" zIndex="modal">
						<MenuItemGroup id="navbar.profile-settings">
							<UpdateProfile __SSR_DATA={{user}} />
							<MenuSeparator />
							<ChangePassword />
							<Signout />
						</MenuItemGroup>
					</MenuContent>
				</MenuPositioner>
			</Portal>
		</Menu>
	);
}
