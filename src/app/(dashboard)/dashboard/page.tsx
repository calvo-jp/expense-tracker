import {prisma} from "@/config/prisma";
import {Box, Flex, Spacer, styled} from "@/styled-system/jsx";
import {Metadata} from "next";
import {cookies} from "next/headers";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default async function Dashboard() {
	const id = cookies().get("user")?.value;

	const user = await prisma.user.findUniqueOrThrow({
		where: {id},
		select: {
			name: true,
			username: true,
		},
	});

	return (
		<Box>
			<Flex>
				<Box>
					<styled.h1 textStyle="3xl" fontFamily="heading" fontWeight="bold">
						Dashboard
					</styled.h1>
					<styled.p
						color="fg.muted"
						fontSize="sm"
						display="flex"
						alignItems="center"
					>
						<styled.span mr={1}>Welcome back,</styled.span>
						<styled.strong fontWeight="semibold">
							{user.name ?? user.username}
						</styled.strong>
						<styled.span>!</styled.span>
					</styled.p>
				</Box>
				<Spacer />
			</Flex>
		</Box>
	);
}
