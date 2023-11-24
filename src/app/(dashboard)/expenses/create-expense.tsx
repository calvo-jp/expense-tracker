'use client';

import {Button} from '@/components/button';
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
import {Portal} from '@ark-ui/react';
import {PlusIcon, XIcon} from 'lucide-react';
import {useState} from 'react';

export function CreateExpense() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button variant="outline" onClick={() => setOpen(true)}>
				<Icon>
					<PlusIcon />
				</Icon>
				Add new
			</Button>

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
		</>
	);
}
