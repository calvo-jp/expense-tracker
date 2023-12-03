import {Button} from "@/components/button";
import {Link} from "@/components/next-js/link";
import {Flex, HStack, Spacer, styled} from "@/styled-system/jsx";
import {Logo} from "../logo";

export function Navbar() {
	return (
		<styled.header borderBottomWidth="1px">
			<Flex
				h="navbar.height"
				maxW="breakpoint-lg"
				mx="auto"
				py={3}
				px={8}
				alignItems="center"
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
				</HStack>
			</Flex>
		</styled.header>
	);
}
