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
import {Box, Flex, Spacer, styled} from '@/styled-system/jsx';
import {
	format,
	formatDistanceToNow,
	subDays,
	subMinutes,
	subSeconds,
	subWeeks,
	subYears,
} from 'date-fns';
import {SettingsIcon} from 'lucide-react';
import {Metadata} from 'next';
import {CreateExpense} from './create-expense';
import {DeleteExpense} from './delete-expense';
import {EditExpense} from './edit-expense';
import {Export} from './export';
import {Filter} from './filter';
import {PageControls} from './page-controls';

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
							<TableHead>What</TableHead>
							<TableHead>Where</TableHead>
							<TableHead>When</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{items.map((item) => (
							<TableRow key={item.id}>
								<TableCell>{item.what}</TableCell>
								<TableCell>{item.where}</TableCell>
								<TableCell>
									<Tooltip
										positioning={{
											placement: 'right',
										}}
									>
										<TooltipTrigger asChild>
											<styled.span>
												{formatDistanceToNow(item.when)}
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

												{format(item.when, 'yyyy MMM dd hh:mm a')}
											</TooltipContent>
										</TooltipPositioner>
									</Tooltip>
								</TableCell>
								<TableCell fontVariantNumeric="tabular-nums">
									{numberFormatter.format(item.amount)}
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
												<MenuItemGroup id={`expenses-menu--${item.id}`}>
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
							<TableCell colSpan={3}>Total</TableCell>
							<TableCell fontVariantNumeric="tabular-nums">
								{numberFormatter.format(
									items.reduce((total, item) => total + item.amount, 0),
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

const items = [
	{
		id: 1,
		what: 'Mcdo',
		when: subWeeks(new Date(), 1),
		where: 'Sagay City',
		amount: 1999,
	},
	{
		id: 2,
		what: 'Shopping',
		when: subDays(new Date(), 3),
		where: 'Cadiz City',
		amount: 249,
	},
	{
		id: 3,
		what: 'Others',
		when: subMinutes(new Date(), 5),
		where: 'Bacolod City',
		amount: 79,
	},
	{
		id: 4,
		what: 'Shoes',
		when: subSeconds(new Date(), 15),
		where: 'Bacolod City',
		amount: 599,
	},
	{
		id: 5,
		what: 'Pizza',
		when: subYears(new Date(), 1),
		where: 'Fabrica',
		amount: 29,
	},
];

const numberFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 1,
	maximumFractionDigits: 2,
});
