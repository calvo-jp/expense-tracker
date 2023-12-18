import {Spinner} from "@/app/spinner";
import {Icon} from "@/components/icon";
import {Link} from "@/components/next-js/link";
import {authOptions} from "@/config/auth-options";
import {Box, Flex, HStack, Spacer, styled} from "@/styled-system/jsx";
import assert from "assert";
import {ChevronRightIcon, ClockIcon, SplitIcon} from "lucide-react";
import {Metadata} from "next";
import {getServerSession} from "next-auth";
import {Suspense} from "react";
import {Breakdown} from "./breakdown";
import {Cards} from "./cards";
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

			<Flex flexDir="column" mt={12}>
				<Suspense fallback={<Spinner />}>
					<Cards duration={duration} />
				</Suspense>

				<Box mt={14}>
					<HStack mb={4}>
						<Icon>
							<SplitIcon />
						</Icon>
						<styled.h2 fontSize="lg" fontFamily="heading" fontWeight="medium">
							Breakdown
						</styled.h2>
					</HStack>

					<Suspense fallback={<Spinner />}>
						<Breakdown duration={duration} />
					</Suspense>
				</Box>

				<Box mt={14}>
					<Flex mb={4} alignItems="center">
						<HStack>
							<Icon>
								<ClockIcon />
							</Icon>
							<styled.h2 fontSize="lg" fontFamily="heading" fontWeight="medium">
								Recently added
							</styled.h2>
						</HStack>

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
							<styled.span fontSize="sm">See all expenses</styled.span>
							<Icon>
								<ChevronRightIcon />
							</Icon>
						</Link>
					</Flex>

					<Suspense fallback={<Spinner />}>
						<RecentlyAdded duration={duration} />
					</Suspense>
				</Box>
			</Flex>
		</Box>
	);
}

async function Username() {
	const session = await getServerSession(authOptions);

	assert(session);

	return (
		<styled.strong fontWeight="semibold">{session.user.name}!</styled.strong>
	);
}
