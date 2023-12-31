"use client";

import {Spinner} from "@/app/spinner";
import {Button} from "@/components/button";
import {
	Dialog,
	DialogBackdrop,
	DialogCloseTrigger,
	DialogContent,
	DialogDescription,
	DialogPositioner,
	DialogTitle,
	DialogTrigger,
} from "@/components/dialog";
import {Icon} from "@/components/icon";
import {MenuItem} from "@/components/menu";
import {toast} from "@/components/toaster";
import {Box, Flex, HStack, styled} from "@/styled-system/jsx";
import {Portal} from "@ark-ui/react";
import {Expense} from "@prisma/client";
import {FileX2Icon} from "lucide-react";
import {useTransition} from "react";
import {deleteExpense} from "./actions";

interface DeleteExpenseProps {
	data: Expense;
}

export function DeleteExpense(props: DeleteExpenseProps) {
	const [pending, startTransition] = useTransition();

	return (
		<Dialog
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
								<Box p={6} maxW="26rem">
									<DialogTitle fontSize="xl">Delete Record</DialogTitle>
									<DialogDescription fontSize="md">
										This action is irreversible. Are you sure you want
										to&nbsp;continue?
									</DialogDescription>

									<Flex mt={8} gap={3}>
										<DialogCloseTrigger asChild>
											<Button
												w="full"
												size="lg"
												variant="outline"
												disabled={pending}
											>
												Cancel
											</Button>
										</DialogCloseTrigger>

										<Button
											w="full"
											size="lg"
											disabled={pending}
											onClick={async () => {
												startTransition(async () => {
													await deleteExpense(props.data.id);

													api.close();
													toast.success({
														title: "Success",
														description: "Record has been deleted",
													});
												});
											}}
										>
											{pending ? <Spinner /> : "Proceed"}
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
