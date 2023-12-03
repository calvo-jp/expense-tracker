import {Icon} from "@/components/icon";
import {Link} from "@/components/next-js/link";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/table";
import {Box, Flex, Spacer, styled} from "@/styled-system/jsx";
import {ChevronRightIcon} from "lucide-react";

export function RecentlyAdded() {
	return (
		<Box>
			<Flex alignItems="center">
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
					<styled.span fontSize="sm">See all</styled.span>
					<Icon>
						<ChevronRightIcon />
					</Icon>
				</Link>
			</Flex>

			<Box
				mt={4}
				maxW="full"
				display="block"
				overflowX="auto"
				overflowY="hidden"
				whiteSpace="nowrap"
				WebkitOverflowScrolling="touch"
				borderWidth="1px"
			>
				<Table
					variant="outline"
					border="none"
					borderCollapse="separate"
					borderSpacing={0}
					css={{
						"& thead, & tfoot, & tr": {
							bg: "none",
						},
						"& th, & td": {
							bg: "bg.default",
							border: "none",
							borderLeft: "1px solid token(colors.border.subtle)",
							borderBottom: "1px solid token(colors.border.subtle)",
							textAlign: "center",
							_first: {
								borderLeft: "none",
							},
						},
						"& th": {
							fontSize: "xs",
							fontFamily: "heading",
						},
						"& tfoot td": {
							borderBottom: "none",
						},
					}}
				>
					<TableHeader>
						<TableRow>
							<TableHead>Category</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Location</TableHead>
							<TableHead>Transaction Date</TableHead>
							<TableHead>Date Created</TableHead>
							<TableHead>Date Updated</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Food</TableCell>
							<TableCell>Food is life</TableCell>
							<TableCell textAlign="right!">300.0</TableCell>
							<TableCell>Bacolod City</TableCell>
							<TableCell>2021 Jul 15</TableCell>
							<TableCell>2021 Jul 2021 3:35 AM</TableCell>
							<TableCell>2021 Jul 2021 3:35 AM</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell />
							<TableCell />
							<TableCell fontFamily="mono" textAlign="right!">
								5,551.0
							</TableCell>
							<TableCell />
							<TableCell />
							<TableCell />
							<TableCell />
						</TableRow>
					</TableFooter>
				</Table>
			</Box>
		</Box>
	);
}
