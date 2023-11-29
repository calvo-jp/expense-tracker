import {prisma} from "@/config/prisma";
import {Box, Flex, Spacer, styled} from "@/styled-system/jsx";
import {WebServiceClient} from "@maxmind/geoip2-node";
import {Metadata} from "next";
import {cookies, headers} from "next/headers";
import {Suspense} from "react";

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
				<Suspense fallback={null}>
					<YearSummary />
				</Suspense>
				<Suspense fallback={null}>
					<MonthSummary />
				</Suspense>
			</Flex>
		</Box>
	);
}

async function YearSummary() {
	const client = new WebServiceClient(
		process.env.MAXMIND_ACCOUNT_ID!,
		process.env.MAXMIND_LICENSE_KEY!,
		{
			host: "geolite.info",
		},
	);

	const {city} = await client.city(headers().get("x-forwarded-for")!);

	return <div>{city?.names.en}</div>;
}

async function MonthSummary() {
	return null;
}
