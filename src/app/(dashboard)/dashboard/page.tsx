import {Spinner} from "@/app/spinner";
import {Icon} from "@/components/icon";
import {Link} from "@/components/next-js/link";
import {prisma} from "@/config/prisma";
import {Box, Flex, Spacer, styled} from "@/styled-system/jsx";
import assert from "assert";
import {ChevronRightIcon} from "lucide-react";
import {Metadata} from "next";
import {cookies} from "next/headers";
import {Suspense, cache} from "react";
import {Cards} from "./cards";
import {ExpensesPerCategory} from "./expenses-per-category";
import {Filter} from "./filter";
import {RecentlyAdded} from "./recently-added";
import {parseDuration} from "./utils";

export const metadata: Metadata = {
	title: "Dashboard",
};

interface DashboardProps {
	searchParams: Record<string, string | string[]>;
}

export default function Dashboard(props: DashboardProps) {
	const duration = parseDuration(props.searchParams);

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

				<Filter __SSR_DATA={{duration}} />
			</Flex>

			<Flex flexDir="column" gap={14} mt={12}>
				<Suspense fallback={<Spinner />}>
					<Cards duration={duration} />
				</Suspense>

				<Box>
					<styled.h2
						mb={4}
						fontSize="lg"
						fontFamily="heading"
						fontWeight="medium"
					>
						Expenses Per Category
					</styled.h2>

					<Suspense fallback={<Spinner />}>
						<ExpensesPerCategory duration={duration} />
					</Suspense>
				</Box>

				<Box>
					<Flex mb={4} alignItems="center">
						<styled.h2 fontSize="lg" fontFamily="heading" fontWeight="medium">
							Recently Added
						</styled.h2>
						<Spacer />
						<Link
							href="/expenses"
							display="flex"
							alignItems="center"
							gap={1}
							color={{
								base: "fg.muted",
								_hover: "fg.default",
							}}
						>
							<styled.span fontSize="sm">Go to expenses</styled.span>
							<Icon>
								<ChevronRightIcon />
							</Icon>
						</Link>
					</Flex>

					<Suspense fallback={<Spinner />}>
						<RecentlyAdded />
					</Suspense>
				</Box>
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
