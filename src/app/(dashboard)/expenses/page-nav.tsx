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
import {ChevronLeftIcon, ChevronRightIcon} from 'lucide-react';
import {Fragment} from 'react';

export function PageNav() {
	return (
		<Pagination
			w="fit"
			count={90}
			pageSize={10}
			siblingCount={1}
			defaultPage={2}
		>
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
	);
}

const PRODUCTS = [
	{id: 'P001', name: 'MacBook Pro', stock: 12, price: '$1999.00'},
	{id: 'P002', name: 'AirPods Pro', stock: 25, price: '$249.00'},
	{id: 'P003', name: 'Leather Wallet', stock: 50, price: '$79.00'},
];
