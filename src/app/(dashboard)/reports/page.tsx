import {Icon} from "@/components/icon";
import {IconButton} from "@/components/icon-button";
import {
	Popover,
	PopoverArrow,
	PopoverArrowTip,
	PopoverCloseTrigger,
	PopoverContent,
	PopoverDescription,
	PopoverPositioner,
	PopoverTitle,
	PopoverTrigger,
} from "@/components/popover";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/table";
import {prisma} from "@/config/prisma";
import {Box, Flex, Spacer, styled} from "@/styled-system/jsx";
import {currencyFormatter} from "@/utils/currency-formatter";
import {PaginationSchema} from "@/utils/types";
import {Portal} from "@ark-ui/react";
import {DateRange} from "@prisma/client";
import assert from "assert";
import {format, isSameMonth, isSameYear} from "date-fns";
import {XIcon} from "lucide-react";
import {Metadata} from "next";
import {cookies} from "next/headers";
import {Suspense} from "react";
import {PageControls} from "../page-controls";
import {Export} from "./export";
import {Filter} from "./filter";

export const metadata: Metadata = {
	title: "Reports",
};

export default async function Reports({
	searchParams,
}: {
	searchParams: {[key: string]: string | string[]};
}) {
	const id = cookies().get("user")?.value;

	assert(id);

	const user = await prisma.user.findUnique({
		where: {id},
		select: {
			currency: true,
		},
	});

	const pagination = PaginationSchema.parse(searchParams);
	const reports = await prisma.report.findMany({
		where: {user: {id}},
		orderBy: {
			createdAt: "desc",
		},
		take: pagination.size,
		skip: pagination.size * (pagination.page - 1),
	});

	return (
		<Box>
			<Flex>
				<Popover
					positioning={{
						placement: "bottom-start",
					}}
				>
					<PopoverTrigger asChild>
						<styled.h1 textStyle="3xl" fontFamily="heading" fontWeight="bold">
							Reports
						</styled.h1>
					</PopoverTrigger>
					<Portal>
						<PopoverPositioner>
							<PopoverContent>
								<PopoverArrow>
									<PopoverArrowTip />
								</PopoverArrow>
								<Box>
									<PopoverTitle textStyle="md">
										What is on this page?
									</PopoverTitle>
									<PopoverDescription lineHeight="tight">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Explicabo magni veniam mollitia facilis nemo fugit.
									</PopoverDescription>
								</Box>
								<Box position="absolute" top="1" right="1">
									<PopoverCloseTrigger asChild>
										<IconButton
											aria-label="Close Popover"
											variant="ghost"
											size="sm"
										>
											<Icon>
												<XIcon />
											</Icon>
										</IconButton>
									</PopoverCloseTrigger>
								</Box>
							</PopoverContent>
						</PopoverPositioner>
					</Portal>
				</Popover>
				<Spacer />
				<Flex gap={3}>
					<Export />
					<Filter />
				</Flex>
			</Flex>

			<Box mt={8}>
				<Table variant="outline">
					<TableHeader>
						<TableRow>
							<TableHead>Inclusion date</TableHead>
							<TableHead>Frequency</TableHead>
							<TableHead>Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{reports.map((report) => (
							<TableRow key={report.id}>
								<TableCell>
									{formatInclusionDate(report.inclusionDate)}
								</TableCell>
								<TableHead>{report.frequency}</TableHead>
								<TableCell fontVariantNumeric="tabular-nums">
									{currencyFormatter.format(report.amount, user?.currency)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={2}>Total</TableCell>
							<TableCell fontVariantNumeric="tabular-nums">
								{currencyFormatter.format(
									reports.reduce((total, {amount}) => total + amount, 0),
									user?.currency,
								)}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</Box>

			<Suspense fallback={null}>
				<BottomControls />
			</Suspense>
		</Box>
	);
}

async function BottomControls() {
	const count = await prisma.report.count();

	return (
		<Box mt={8}>
			<PageControls __SSR_DATA={{count}} />
		</Box>
	);
}

function formatInclusionDate({start, until}: DateRange): string {
	const sy = format(start, "yyyy");
	const sm = format(start, "MMM");
	const sd = format(start, "d");

	const uy = format(until, "yyyy");
	const um = format(until, "MMM");
	const ud = format(until, "d");

	if (!isSameYear(start, until)) {
		return `${sm} ${sd}, ${sy} - ${um} ${ud}, ${uy}`; /* Jan 1, 2022 - Jan 1,2023 */
	}

	if (!isSameMonth(start, until)) {
		return `${sm} ${sd} - ${um} ${ud}, ${sy}`; /* Jan 1 - Feb 1, 2023 */
	}

	return `${sm} ${sd}-${ud}, ${sy}`; /* Jan 1-31, 2023 */
}
