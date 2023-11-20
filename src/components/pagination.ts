'use client';

import {styled} from '@/styled-system/jsx';
import {pagination} from '@/styled-system/recipes';
import {createStyleContext} from '@/utils/create-style-context';
import {Pagination as parts} from '@ark-ui/react';

const {withProvider, withContext} = createStyleContext(pagination);

export const Pagination = withProvider(styled(parts.Root), 'root');
export const PaginationEllipsis = withContext(styled(parts.Ellipsis), 'ellipsis');
export const PaginationNextTrigger = withContext(
	styled(parts.NextTrigger),
	'nextTrigger',
);
export const PaginationItem = withContext(styled(parts.Item), 'item');
export const PaginationPrevTrigger = withContext(
	styled(parts.PrevTrigger),
	'prevTrigger',
);
