import {prisma} from "@/config/prisma";
import {Box, styled} from "@/styled-system/jsx";
import assert from "assert";
import {Metadata} from "next";
import {cookies} from "next/headers";
import {CurrencySettings} from "./currency-settings";

export const metadata: Metadata = {
	title: "Settings",
};

export default async function Settings() {
	const id = cookies().get("user")?.value;

	assert(id);

	const user = await prisma.user.findUniqueOrThrow({where: {id}});

	return (
		<Box>
			<Box mb={8}>
				<styled.h1 fontFamily="heading" textStyle="3xl" fontWeight="bold">
					Settings
				</styled.h1>
			</Box>

			<CurrencySettings __SSR_DATA={{user}} />
		</Box>
	);
}
