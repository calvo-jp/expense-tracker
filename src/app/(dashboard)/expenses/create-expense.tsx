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
	DialogTrigger,
} from '@/components/dialog';
import {Icon} from '@/components/icon';
import {IconButton} from '@/components/icon-button';
import {Portal} from '@ark-ui/react';
import {PlusIcon, XIcon} from 'lucide-react';

export function CreateExpense() {
	return (
		<Dialog lazyMount unmountOnExit>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Icon>
						<PlusIcon />
					</Icon>
					Add new
				</Button>
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
