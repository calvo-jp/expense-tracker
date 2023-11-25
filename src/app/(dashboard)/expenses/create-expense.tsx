'use client';

import {Button} from '@/components/button';
import {
	Dialog,
	DialogBackdrop,
	DialogContent,
	DialogPositioner,
	DialogTrigger,
} from '@/components/dialog';
import {Icon} from '@/components/icon';
import {Box} from '@/styled-system/jsx';
import {Portal} from '@ark-ui/react';
import {PlusIcon} from 'lucide-react';

export function CreateExpense() {
	return (
		<Dialog
			lazyMount
			unmountOnExit
			closeOnEscapeKeyDown={false}
			closeOnInteractOutside={false}
		>
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
					<DialogContent asChild>
						<Box></Box>
					</DialogContent>
				</DialogPositioner>
			</Portal>
		</Dialog>
	);
}
