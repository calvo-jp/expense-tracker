'use client';

import {Button} from '@/components/button';
import {Icon} from '@/components/icon';
import {IconButton} from '@/components/icon-button';
import {
	Pagination,
	PaginationEllipsis,
	PaginationItem,
	PaginationNextTrigger,
	PaginationPrevTrigger,
} from '@/components/pagination';
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
import {Box, Flex, Spacer} from '@/styled-system/jsx';
import {Portal} from '@ark-ui/react';
import {
	CheckIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsUpDownIcon,
} from 'lucide-react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {PaginationSchema} from './schema';

const sizes = [10, 25, 50].map((size) => ({
	value: `${size}`,
	label: `${size} rows`,
}));

export function PageControls() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const pagination = PaginationSchema.parse({
		page: searchParams.get('page') ?? 1,
		size: searchParams.get('size') ?? 10,
	});

	const update = (value: {page: string | number; size: string | number}) => {
		const s = new URLSearchParams(searchParams);

		s.delete('page');
		s.delete('size');

		s.set('page', `${value.page}`);
		s.set('size', `${value.size}`);

		router.push(`${pathname}?${s.toString()}`);
	};

	const count = 100;
	const start = 1 + (pagination.page - 1) * pagination.size;
	const until = clamp(
		pagination.page * pagination.size,
		pagination.size,
		count,
	);

	return (
		<Flex gap={4} alignItems="center">
			<Box fontSize="sm">
				Showing {start}-{until} of {count}
			</Box>
			<Spacer />
			<Pagination
				count={count}
				// @ts-expect-error
				page={pagination.page}
				pageSize={pagination.size}
				onPageChange={(o) => {
					update({
						page: o.page,
						size: o.pageSize,
					});
				}}
			>
				{({pages}) => (
					<>
						<PaginationPrevTrigger asChild>
							<IconButton variant="outline" aria-label="Next Page">
								<Icon>
									<ChevronLeftIcon />
								</Icon>
							</IconButton>
						</PaginationPrevTrigger>

						{pages.map((page, index) => {
							return page.type === 'page' ? (
								<PaginationItem key={index} asChild {...page}>
									<Button variant="outline">{page.value}</Button>
								</PaginationItem>
							) : (
								<PaginationEllipsis key={index} index={index}>
									...
								</PaginationEllipsis>
							);
						})}

						<PaginationNextTrigger asChild>
							<IconButton variant="outline" aria-label="Next Page">
								<Icon>
									<ChevronRightIcon />
								</Icon>
							</IconButton>
						</PaginationNextTrigger>
					</>
				)}
			</Pagination>

			<Select
				w={28}
				loop
				lazyMount
				items={sizes}
				value={[pagination.size.toString()]}
				onValueChange={({value}) => {
					update({
						page: 1,
						size: value[0],
					});
				}}
			>
				<SelectControl>
					<SelectTrigger>
						<SelectValueText />
						<Icon>
							<ChevronsUpDownIcon />
						</Icon>
					</SelectTrigger>
				</SelectControl>

				<Portal>
					<SelectPositioner>
						<SelectContent>
							<SelectItemGroup id="expenses-pagination-page-size">
								{sizes.map((product) => (
									<SelectItem key={product.value} item={product}>
										<SelectItemText>{product.label}</SelectItemText>
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
				</Portal>
			</Select>
		</Flex>
	);
}

function clamp(n: number, min: number, max: number) {
	if (n < min) return min;
	if (n > max) return max;
	return n;
}
