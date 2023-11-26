import {Icon} from '@/components/icon';
import {
	Menu,
	MenuContent,
	MenuItemGroup,
	MenuPositioner,
	MenuTrigger,
} from '@/components/menu';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/table';
import {
	Tooltip,
	TooltipArrow,
	TooltipArrowTip,
	TooltipContent,
	TooltipPositioner,
	TooltipTrigger,
} from '@/components/tooltip';
import {prisma} from '@/config/prisma';
import {Box, Flex, Spacer, styled} from '@/styled-system/jsx';
import {format, formatDistanceToNow} from 'date-fns';
import {SettingsIcon} from 'lucide-react';
import {Metadata} from 'next';
import {cookies} from 'next/headers';
import {PageControls} from '../page-controls';
import CreateExpense from './create-expense';
import {DeleteExpense} from './delete-expense';
import {EditExpense} from './edit-expense';
import {Export} from './export';
import {Filter} from './filter';

export const metadata: Metadata = {
	title: 'Expenses',
};

export default async function Expenses() {
	const id = cookies().get('user')?.value;

	const user = await prisma.user.findUnique({
		where: {id},
		select: {
			currency: true,
		},
	});

	const expenses = await prisma.expense.findMany({
		include: {
			user: {
				select: {
					currency: true,
				},
			},
		},
	});

	const numberFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: user?.currency ?? 'USD',
		minimumFractionDigits: 1,
		maximumFractionDigits: 2,
	});

	return (
		<Box>
			<Flex>
				<styled.h1 textStyle="3xl" fontFamily="heading" fontWeight="bold">
					Expenses
				</styled.h1>
				<Spacer />
				<Flex gap={3}>
					<Export />
					<Filter />
					<CreateExpense />
				</Flex>
			</Flex>

			<Box mt={8}>
				<Table variant="outline">
					<TableHeader>
						<TableRow>
							<TableHead>Category</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Location</TableHead>
							<TableHead>Transaction date</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{expenses.map((expense) => (
							<TableRow key={expense.id}>
								<TableCell>{expense.category}</TableCell>
								<TableCell>{expense.description}</TableCell>
								<TableCell>{expense.location}</TableCell>
								<TableCell>
									<Tooltip
										lazyMount
										positioning={{
											placement: 'right',
										}}
									>
										<TooltipTrigger asChild>
											<styled.span>
												{formatDistanceToNow(expense.transactionDate, {
													addSuffix: true,
												})}
											</styled.span>
										</TooltipTrigger>
										<TooltipPositioner>
											<TooltipContent>
												<TooltipArrow
													css={{
														'--arrow-size': 'token(sizes.3)',
														'--arrow-background': 'colors.fg.default',
													}}
												>
													<TooltipArrowTip />
												</TooltipArrow>

												{format(expense.transactionDate, 'yyyy MMM dd')}
											</TooltipContent>
										</TooltipPositioner>
									</Tooltip>
								</TableCell>
								<TableCell fontVariantNumeric="tabular-nums">
									{numberFormatter.format(expense.amount)}
								</TableCell>
								<TableCell>
									<Menu
										positioning={{
											flip: true,
											placement: 'bottom',
										}}
									>
										<MenuTrigger asChild>
											<styled.button cursor="pointer">
												<Icon>
													<SettingsIcon />
												</Icon>
											</styled.button>
										</MenuTrigger>
										<MenuPositioner>
											<MenuContent w="12rem" shadow="none" borderWidth="1px">
												<MenuItemGroup id={`expenses-menu--${expense.id}`}>
													<EditExpense />
													<DeleteExpense />
												</MenuItemGroup>
											</MenuContent>
										</MenuPositioner>
									</Menu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={4}>Total</TableCell>
							<TableCell fontVariantNumeric="tabular-nums">
								{numberFormatter.format(
									expenses.reduce(
										(total, expense) => total + expense.amount,
										0,
									),
								)}
							</TableCell>
							<TableCell />
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
