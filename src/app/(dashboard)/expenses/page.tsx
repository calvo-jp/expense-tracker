import {Button} from '@/components/button';
import {Icon} from '@/components/icon';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/table';
import {Box, Center, Flex, Spacer, styled} from '@/styled-system/jsx';
import {formatDistanceToNow, subDays, subMinutes, subWeeks} from 'date-fns';
import {PlusIcon, SettingsIcon} from 'lucide-react';
import {Metadata} from 'next';
import {PageNav} from './page-nav';

export const metadata: Metadata = {
	title: 'Expenses',
};

export default function Expenses() {
	return (
		<Box>
			<Flex>
				<styled.h1 textStyle="3xl" fontWeight="bold" letterSpacing="wide">
					Expenses
				</styled.h1>
				<Spacer />
				<Button variant="outline">
					<Icon>
						<PlusIcon />
					</Icon>
					Add new
				</Button>
			</Flex>

			<Box mt={10}>
				<Table variant="outline">
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Date Made</TableHead>
							<TableHead>Date Created</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{PRODUCTS.map((product, index) => (
							<TableRow key={index}>
								<TableCell>{product.id}</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell>{product.amount}</TableCell>
								<TableCell>
									{formatDistanceToNow(product.madeAt, {
										addSuffix: true,
										includeSeconds: true,
									})}
								</TableCell>
								<TableCell>
									{formatDistanceToNow(product.createdAt, {
										addSuffix: true,
										includeSeconds: true,
									})}
								</TableCell>
								<TableCell>
									<styled.button cursor="pointer">
										<Icon>
											<SettingsIcon />
										</Icon>
									</styled.button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell>Total</TableCell>
							<TableCell />
							<TableCell>$34,163.00</TableCell>
							<TableCell />
							<TableCell />
						</TableRow>
					</TableFooter>
				</Table>
			</Box>

			<Center mt={10}>
				<PageNav />
			</Center>
		</Box>
	);
}

const PRODUCTS = [
	{
		id: '00001',
		name: 'Mcdo',
		amount: '$1999.00',
		madeAt: subWeeks(new Date(), 1),
		createdAt: subWeeks(new Date(), 1),
	},
	{
		id: '00002',
		name: 'Shopping',
		amount: '$249.00',
		madeAt: subDays(new Date(), 3),
		createdAt: subDays(new Date(), 3),
	},
	{
		id: '00003',
		name: 'Others',
		amount: '$79.00',
		madeAt: subMinutes(new Date(), 5),
		createdAt: subMinutes(new Date(), 5),
	},
];
