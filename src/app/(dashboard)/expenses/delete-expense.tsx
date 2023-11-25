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
import {MenuItem} from '@/components/menu';
import {toast} from '@/components/toaster';
import {Box, Flex, HStack, styled} from '@/styled-system/jsx';
import {Portal} from '@ark-ui/react';
import {FileX2Icon} from 'lucide-react';
import {useId} from 'react';

export function DeleteExpense() {
	const id = useId();

	return (
		<Dialog
			lazyMount
			unmountOnExit
			closeOnEscapeKeyDown={false}
			closeOnInteractOutside={false}
		>
			<DialogTrigger asChild>
				<MenuItem id={`expenses.items.${id}.menu.delete`}>
					<HStack>
						<Icon>
							<FileX2Icon />
						</Icon>
						<styled.span>Delete</styled.span>
					</HStack>
				</MenuItem>
			</DialogTrigger>

			<Portal>
				<DialogBackdrop />
				<DialogPositioner>
					<DialogContent asChild>
						<Box p={6}>
							<DialogTitle>Delete Record</DialogTitle>
							<DialogDescription>
								This action is irreversible. Are you sure you want to continue?
							</DialogDescription>

							<Flex mt={8} gap={3} justifyContent="end">
								<DialogCloseTrigger asChild>
									<Button variant="outline">Cancel</Button>
								</DialogCloseTrigger>
								<DialogCloseTrigger
									asChild
									onClick={() => {
										toast.success({
											title: 'Success',
											description: 'Item has been deleted',
										});
									}}
								>
									<Button>Proceed</Button>
								</DialogCloseTrigger>
							</Flex>
						</Box>
					</DialogContent>
				</DialogPositioner>
			</Portal>
		</Dialog>
	);
}
