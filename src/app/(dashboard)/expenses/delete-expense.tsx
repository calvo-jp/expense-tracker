'use client';

import {deleteExpense} from '@/common/actions';
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
import {Expense} from '@prisma/client';
import {FileX2Icon} from 'lucide-react';
import {useTransition} from 'react';

interface DeleteExpenseProps {
	data: Expense;
}

export function DeleteExpense(props: DeleteExpenseProps) {
	const [pending, startTransition] = useTransition();

	return (
		<Dialog
			lazyMount
			unmountOnExit
			closeOnEscapeKeyDown={false}
			closeOnInteractOutside={false}
		>
			{(api) => (
				<>
					<DialogTrigger asChild>
						<MenuItem id={`expenses.items.${props.data.id}.menu.delete`}>
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
										This action is irreversible. Are you sure you want to
										continue?
									</DialogDescription>

									<Flex mt={8} gap={3} justifyContent="end">
										<DialogCloseTrigger asChild>
											<Button variant="outline" disabled={pending}>
												Cancel
											</Button>
										</DialogCloseTrigger>

										<Button
											disabled={pending}
											onClick={async () => {
												startTransition(async () => {
													await deleteExpense(props.data.id);

													api.close();
													toast.success({
														title: 'Success',
														description: 'Record has been deleted',
													});
												});
											}}
										>
											Proceed
										</Button>
									</Flex>
								</Box>
							</DialogContent>
						</DialogPositioner>
					</Portal>
				</>
			)}
		</Dialog>
	);
}
