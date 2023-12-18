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
import {authOptions} from "@/config/auth-options";
import {Box, Spacer, styled} from "@/styled-system/jsx";
import {getInitials} from "@/utils/get-initials";
import {Portal} from "@ark-ui/react";
import assert from "assert";
import {ChevronDownIcon} from "lucide-react";
import {getServerSession} from "next-auth";
import {Suspense} from "react";
import {Logo} from "../logo";
import {Signout} from "./sign-out";
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
	const session = await getServerSession(authOptions);

	assert(session);

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
						<AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
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
							<UpdateProfile />
							<ThemeSettings />
							<MenuItem id="navbar.profile-settings.signout" gap={2} asChild>
								<Signout />
							</MenuItem>
						</MenuItemGroup>
					</MenuContent>
				</MenuPositioner>
			</Portal>
		</Menu>
	);
}
