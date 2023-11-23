'use client';

import {Icon} from '@/components/icon';
import {MenuItem} from '@/components/menu';
import {toast} from '@/components/toaster';
import {HStack, styled} from '@/styled-system/jsx';
import {FileX2Icon} from 'lucide-react';
import {useId} from 'react';

export function DeleteExpense() {
	const id = useId();

	return (
		<MenuItem
			id={`expenses-menu--${id}--item-2`}
			onClick={() => {
				toast.success({
					title: 'Success',
					description: 'Item has been deleted',
				});
			}}
		>
			<HStack>
				<Icon>
					<FileX2Icon />
				</Icon>
				<styled.span>Delete</styled.span>
			</HStack>
		</MenuItem>
	);
}
