import {Avatar, AvatarFallback} from "@/components/avatar";
import {Icon} from "@/components/icon";
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
import {ChevronDownIcon, PowerIcon} from "lucide-react";
import {cookies} from "next/headers";
import {Suspense} from "react";
import {Logo} from "../logo";
import {logout} from "./actions";
import {ThemeSettings} from "./theme-settings";
import {UpdateProfile} from "./update-profile";

export function Navbar() {
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
				<Suspense fallback={null}>
					<NavbarProfile />
				</Suspense>
			</styled.header>

			<Box h="navbar.height" />
		</>
	);
}

async function NavbarProfile() {
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
				<styled.button
					display="flex"
					alignItems="center"
					gap={1.5}
					px={1}
					cursor="pointer"
					css={{
						_open: {
							"& svg": {
								transform: "rotate(180deg)",
							},
						},
					}}
				>
					<Avatar>
						<AvatarFallback>{getInitials(user.name)}</AvatarFallback>
					</Avatar>
					<Icon transition="transform token(durations.slow)">
						<ChevronDownIcon />
					</Icon>
				</styled.button>
			</MenuTrigger>

			<Portal>
				<MenuPositioner>
					<MenuContent w="14rem" zIndex="modal">
						<MenuItemGroup id="navbar.profile-settings">
							<UpdateProfile __SSR_DATA={{user}} />
							<ThemeSettings />
							<MenuItem id="navbar.profile-settings.signout" asChild>
								<styled.form action={logout}>
									<styled.button
										display="flex"
										alignItems="center"
										gap={2}
										cursor="pointer"
									>
										<Icon>
											<PowerIcon />
										</Icon>
										<styled.span>Sign out</styled.span>
									</styled.button>
								</styled.form>
							</MenuItem>
						</MenuItemGroup>
					</MenuContent>
				</MenuPositioner>
			</Portal>
		</Menu>
	);
}
