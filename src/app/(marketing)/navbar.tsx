import {Button} from "@/components/button";
import {Link} from "@/components/next-js/link";
import {HStack, Spacer, styled} from "@/styled-system/jsx";
import {Logo} from "../logo";
import {SwitchTheme} from "./switch-theme";

export function Navbar() {
	return (
		<styled.header
			h="navbar.height"
			py={3}
			px={{
				base: 4,
				lg: 8,
			}}
			display="flex"
			alignItems="center"
			borderBottomWidth="1px"
		>
			<Logo />
			<Spacer />
			<HStack gap={3}>
				<Button asChild variant="ghost">
					<Link href="/login">Login</Link>
				</Button>
				<Button asChild variant="outline">
					<Link href="/register">Register</Link>
				</Button>
				<SwitchTheme />
			</HStack>
		</styled.header>
	);
}
