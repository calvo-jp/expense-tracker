'use client';

import {
	Dialog,
	DialogBackdrop,
	DialogCloseTrigger,
	DialogContent,
	DialogDescription,
	DialogPositioner,
	DialogTitle,
} from '@/components/dialog';
import {Icon} from '@/components/icon';
import {IconButton} from '@/components/icon-button';
import {MenuItem} from '@/components/menu';
import {toast} from '@/components/toaster';
import {HStack, styled} from '@/styled-system/jsx';
import {Portal} from '@ark-ui/react';
import {FileX2Icon, XIcon} from 'lucide-react';
import {useId, useState} from 'react';

export function DeleteExpense() {
	const id = useId();
	const [open, setOpen] = useState(false);

	return (
		<>
			<MenuItem
				id={`expenses.items.${id}.menu.delete`}
				onClick={() => {
					setOpen(true);
				}}
			>
				<HStack>
					<Icon>
						<FileX2Icon />
					</Icon>
					<styled.span>Delete</styled.span>
				</HStack>
			</MenuItem>

			<Dialog
				open={open}
				onOpenChange={(details) => {
					setOpen(details.open);
				}}
				lazyMount
				unmountOnExit
				closeOnEscapeKeyDown={false}
				closeOnInteractOutside={false}
			>
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
								onClick={() => {
									toast.success({
										title: 'Success',
										description: 'Item has been deleted',
									});
								}}
							>
								<IconButton aria-label="Close Dialog" variant="ghost" size="sm">
									<XIcon />
								</IconButton>
							</DialogCloseTrigger>
						</DialogContent>
					</DialogPositioner>
				</Portal>
			</Dialog>
		</>
	);
}
