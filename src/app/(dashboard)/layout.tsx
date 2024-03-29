import {Box, Flex, styled} from "@/styled-system/jsx";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {PropsWithChildren} from "react";
import {Navbar} from "./navbar";
import {Sidebar} from "./sidebar";

export default async function Layout({children}: PropsWithChildren) {
	if (!cookies().has("user")) return redirect("/login");

	return (
		<Box h="100vh" minW="breakpoint-lg">
			<Navbar />
			<Flex alignItems="flex-start">
				<Sidebar />

				<styled.main
					p={10}
					w="calc(100vw - token(sizes.sidebar.width))"
					bg="bg.default"
					minH="calc(100vh - token(sizes.navbar.height))"
					flexGrow={1}
				>
					{children}
				</styled.main>
			</Flex>
		</Box>
	);
}
