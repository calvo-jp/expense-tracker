'use client';

import {
	Dialog,
	DialogBackdrop,
	DialogCloseTrigger,
	DialogContent,
	DialogDescription,
	DialogPositioner,
	DialogTitle,
	DialogTrigger,
} from '@/components/dialog';
import {Icon} from '@/components/icon';
import {IconButton} from '@/components/icon-button';
import {MenuItem} from '@/components/menu';
import {HStack, styled} from '@/styled-system/jsx';
import {Portal} from '@ark-ui/react';
import {FileEditIcon, XIcon} from 'lucide-react';
import {useId} from 'react';

export function EditExpense() {
	const id = useId();

	return (
		<Dialog lazyMount unmountOnExit>
			<DialogTrigger asChild>
				<MenuItem id={`expenses.items.${id}.menu.edit`}>
					<HStack>
						<Icon>
							<FileEditIcon />
						</Icon>
						<styled.span>Edit</styled.span>
					</HStack>
				</MenuItem>
			</DialogTrigger>

			<Portal>
				<DialogBackdrop />
				<DialogPositioner>
					<DialogContent>
						<DialogTitle>Dialog Title</DialogTitle>
						<DialogDescription>Dialog Description</DialogDescription>
						<DialogCloseTrigger
							asChild
							position="absolute"
							top="2"
							right="2"
							onClick={() => {}}
						>
							<IconButton aria-label="Close Dialog" variant="ghost" size="sm">
								<XIcon />
							</IconButton>
						</DialogCloseTrigger>
					</DialogContent>
				</DialogPositioner>
			</Portal>
		</Dialog>
	);
}
