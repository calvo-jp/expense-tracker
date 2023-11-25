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
import {Fragment} from 'react';

interface Value {
	page: number;
	size: number;
}

interface PageControlsProps {
	value: Value;
	onChange(value: Value): void;
	count: number;
}

export function PageControls() {
	return (
		<Flex gap={4} alignItems="center">
			<Box fontSize="sm">Showing 1-10 of 1001</Box>
			<Spacer />
			<Pagination count={90} pageSize={10} siblingCount={1} defaultPage={2}>
				{({pages}) => (
					<Fragment>
						<PaginationPrevTrigger asChild>
							<IconButton variant="outline" aria-label="Next Page">
								<Icon>
									<ChevronLeftIcon />
								</Icon>
							</IconButton>
						</PaginationPrevTrigger>

						{pages.map((page, index) => {
							if (page.type === 'page') {
								return (
									<PaginationItem key={index} {...page} asChild>
										<Button variant="outline">{page.value}</Button>
									</PaginationItem>
								);
							}

							return (
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
					</Fragment>
				)}
			</Pagination>

			<Select
				w={28}
				items={sizes}
				loop
				lazyMount
				positioning={{
					sameWidth: true,
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

const sizes = [10, 25, 50].map((size) => ({
	value: `${size}`,
	label: `${size} rows`,
}));
