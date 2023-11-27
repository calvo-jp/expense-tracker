import {Box, Center, styled} from "@/styled-system/jsx";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {PropsWithChildren} from "react";
import {Logo} from "../logo";

export const revalidate = 0;

export default function Layout({children}: PropsWithChildren) {
	if (cookies().has("user")) {
		redirect("/dashboard");
	}

	return (
		<styled.main maxW="22rem" mx="auto" py={24}>
			<Center>
				<Logo h={14} />
			</Center>
			<Box mt={16}>{children}</Box>
		</styled.main>
	);
}
