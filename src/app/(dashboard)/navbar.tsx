import {Avatar, AvatarFallback} from "@/components/avatar";
import {
	Menu,
	MenuContent,
	MenuItem,
	MenuItemGroup,
	MenuPositioner,
	MenuTrigger,
} from "@/components/menu";
import {prisma} from "@/config/prisma";
import {Box, Spacer, styled} from "@/styled-system/jsx";
import {getInitials} from "@/utils/get-initials";
import {Portal} from "@ark-ui/react";
import assert from "assert";
import {cookies} from "next/headers";
import {Logo} from "../logo";
import {ChangePassword} from "./change-password";
import {Signout} from "./sign-out";
import {UpdateProfile} from "./update-profile";

export async function Navbar() {
	const id = cookies().get("user")?.value;

	assert(id);

	const user = await prisma.user.findUniqueOrThrow({where: {id}});

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
									<ChangePassword />
									<MenuItem
										id="navbar.profile-settings.signout"
										gap={2}
										asChild
									>
										<Signout />
									</MenuItem>
								</MenuItemGroup>
							</MenuContent>
						</MenuPositioner>
					</Portal>
				</Menu>
			</styled.header>

			<Box h="navbar.height" />
		</>
	);
}
