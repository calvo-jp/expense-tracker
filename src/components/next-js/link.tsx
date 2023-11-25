'use client';

import {styled} from '@/styled-system/jsx';
import {Assign, HTMLStyledProps} from '@/styled-system/types';
import {dataAttr} from '@/utils/data-attr';
import NextLink, {LinkProps} from 'next/link';
import {usePathname} from 'next/navigation';
import {forwardRef} from 'react';

export const StyledLink = styled(
	NextLink,
	{},
	{
		shouldForwardProp(key) {
			return ['href', 'replace', 'scroll', 'prefetch'].includes(key);
		},
	},
);

export const Link = forwardRef<
	HTMLAnchorElement,
	Assign<HTMLStyledProps<'a'>, LinkProps>
>(function Link(props, ref) {
	const pathname = usePathname();

	const selected =
		removeTrailingSlash(props.href.toString()) ===
		removeTrailingSlash(pathname);

	return <StyledLink ref={ref} data-selected={dataAttr(selected)} {...props} />;
});

function removeTrailingSlash(subject: string) {
	return subject.replace(/\/+$/, '');
}
