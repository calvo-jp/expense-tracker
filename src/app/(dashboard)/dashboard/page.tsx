import {prisma} from "@/config/prisma";
import {Box, Flex, Spacer, styled} from "@/styled-system/jsx";
import assert from "assert";
import {Metadata} from "next";
import {cookies} from "next/headers";
import {Suspense, cache} from "react";
import {Cards} from "./cards";
import {ExpensesPerCategory} from "./expenses-per-category";
import {Filter} from "./filter";
import {RecentlyAdded} from "./recently-added";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default async function Dashboard() {
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
						<Suspense fallback={<styled.span>Loading...</styled.span>}>
							<Username />
						</Suspense>
					</styled.p>
				</Box>
				<Spacer />
				<Filter />
			</Flex>

			<Flex flexDir="column" gap={14} mt={12}>
				<Cards />
				<ExpensesPerCategory />
				<RecentlyAdded />
			</Flex>
		</Box>
	);
}

async function Username() {
	const id = cookies().get("user")?.value;

	assert(id);

	const user = await getUser(id);

	return (
		<styled.strong fontWeight="semibold">
			{user.name ?? user.username}!
		</styled.strong>
	);
}

const getUser = cache(async (id: string) => {
	return await prisma.user.findUniqueOrThrow({
		where: {id},
		select: {
			name: true,
			username: true,
		},
	});
});
