import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/table';
import {prisma} from '@/config/prisma';
import {Box, Flex, Spacer, styled} from '@/styled-system/jsx';
import {Metadata} from 'next';
import {PageControls} from '../page-controls';
import {Export} from './export';
import {Filter} from './filter';

export const metadata: Metadata = {
	title: 'Reports',
};

export default async function Reports() {
	const count = await prisma.report.count();

	return (
		<Box>
			<Flex>
				<styled.h1 textStyle="3xl" fontFamily="heading" fontWeight="bold">
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
							<TableHead>Inclusion date</TableHead>
							<TableHead>Frequency</TableHead>
							<TableHead>Amount</TableHead>
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
				<PageControls __SSR_DATA={{count}} />
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
