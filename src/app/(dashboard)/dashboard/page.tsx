import {Icon} from '@/components/icon';
import {
	Select,
	SelectContent,
	SelectControl,
	SelectItem,
	SelectItemGroup,
	SelectItemIndicator,
	SelectItemText,
	SelectPositioner,
	SelectTrigger,
	SelectValueText,
} from '@/components/select';
import {prisma} from '@/config/prisma';
import {Box, Flex, Spacer, styled} from '@/styled-system/jsx';
import assert from 'assert';
import {CheckIcon, ChevronsUpDownIcon} from 'lucide-react';
import {Metadata} from 'next';
import {cookies} from 'next/headers';
import {Suspense} from 'react';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default function Dashboard() {
	return (
		<Box>
			<Flex alignItems="center">
				<Box fontFamily="heading">
					<styled.h1 textStyle="3xl" fontWeight="bold" lineHeight="none">
						Dashboard
					</styled.h1>
					<Suspense fallback={null}>
						<Greeting />
					</Suspense>
				</Box>
				<Spacer />
				<Select
					w="9rem"
					items={timeAdverbs}
					defaultValue={[timeAdverbs[0].value]}
				>
					<SelectControl>
						<SelectTrigger>
							<SelectValueText />
							<Icon>
								<ChevronsUpDownIcon />
							</Icon>
						</SelectTrigger>
					</SelectControl>

					<SelectPositioner>
						<SelectContent>
							<SelectItemGroup id="dashboard.filter.adverb">
								{timeAdverbs.map((o) => (
									<SelectItem key={o.value} item={o}>
										<SelectItemText>{o.label}</SelectItemText>
										<SelectItemIndicator>
											<Icon>
												<CheckIcon />
											</Icon>
										</SelectItemIndicator>
									</SelectItem>
								))}
							</SelectItemGroup>
						</SelectContent>
					</SelectPositioner>
				</Select>
			</Flex>
		</Box>
	);
}

async function Greeting() {
	const id = cookies().get('user')?.value;

	assert(id);

	const user = await prisma.user.findUniqueOrThrow({
		where: {id},
		select: {
			username: true,
		},
	});

	return (
		<styled.p
			mt={1}
			color="fg.muted"
			fontSize="sm"
			display="flex"
			alignItems="center"
		>
			<styled.span mr={1}>Welcome back,</styled.span>
			<styled.strong fontWeight="semibold">{user.username}</styled.strong>
			<styled.span>!</styled.span>
		</styled.p>
	);
}

const timeAdverbs = [
	'Today',
	'Yesterday',
	'This Week',
	'Last Week',
	'This Month',
	'Last Month',
	'This Year',
	'Last Year',
].map((v) => {
	return {
		label: v,
		value: v,
	};
});
