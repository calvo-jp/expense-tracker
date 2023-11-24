import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/table';
import {Box, Flex, Spacer, styled} from '@/styled-system/jsx';
import {Metadata} from 'next';
import {Export} from './export';
import {Filter} from './filter';
import {PageControls} from './page-controls';

export const metadata: Metadata = {
	title: 'Reports',
};

export default function Reports() {
	return (
		<Box>
			<Flex>
				<styled.h1 textStyle="3xl" fontWeight="bold" letterSpacing="wide">
					Reports
				</styled.h1>
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
							<TableHead>Inclusion Date</TableHead>
							<TableHead>Total</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{items.map((item) => (
							<TableRow key={item.id}>
								<TableCell>{item.inclusionDate}</TableCell>
								<TableCell fontVariantNumeric="tabular-nums">
									{numberFormatter.format(item.amount)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell>Total</TableCell>
							<TableCell fontVariantNumeric="tabular-nums">
								{numberFormatter.format(
									items.reduce((total, item) => total + item.amount, 0),
								)}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</Box>

			<Box mt={8}>
				<PageControls />
			</Box>
		</Box>
	);
}

const items = [
	{
		id: 1,
		inclusionDate: 'Jan 24-30, 2023',
		amount: 399,
	},
	{
		id: 1,
		inclusionDate: 'Feb 01-30, 2023',
		amount: 399,
	},
];

const numberFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 1,
	maximumFractionDigits: 2,
});
