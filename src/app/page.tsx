import {Button} from "@/components/button";
import {Link} from "@/components/next-js/link";
import {HStack, Spacer, styled} from "@/styled-system/jsx";
import {Logo} from "./logo";

export default async function Index() {
	return (
		<>
			<styled.header
				h="navbar.height"
				px={8}
				py={3}
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
				</HStack>
			</styled.header>

			<styled.main></styled.main>
		</>
	);
}
