'use client';

import {Icon} from '@/components/icon';
import {MenuItem} from '@/components/menu';
import {HStack, styled} from '@/styled-system/jsx';
import {FileEditIcon} from 'lucide-react';
import {useId} from 'react';

export function EditExpense() {
	const id = useId();

	return (
		<MenuItem id={`expenses.items.${id}.menu.edit`}>
			<HStack>
				<Icon>
					<FileEditIcon />
				</Icon>
				<styled.span>Edit</styled.span>
			</HStack>
		</MenuItem>
	);
}
