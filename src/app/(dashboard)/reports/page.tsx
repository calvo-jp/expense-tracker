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
import {PageControls} from '../page-controls';
import {Export} from './export';
import {Filter} from './filter';

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
							<TableHead>Frequency</TableHead>
							<TableHead>Total</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{items.map((item) => (
							<TableRow key={item.id}>
								<TableCell>{item.inclusionDate}</TableCell>
								<TableHead>{item.frequency}</TableHead>
								<TableCell fontVariantNumeric="tabular-nums">
									{numberFormatter.format(item.amount)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={2}>Total</TableCell>
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
		frequency: 'Daily',
		inclusionDate: 'Dec 25, 2022',
		amount: 399,
	},
	{
		id: 2,
		frequency: 'Weekly',
		inclusionDate: 'Jan 01-07, 2023',
		amount: 399,
	},
	{
		id: 3,
		frequency: 'Monthly',
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
