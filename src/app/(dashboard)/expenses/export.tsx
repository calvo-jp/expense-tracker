"use client";

import {Button} from "@/components/button";
import {
	Dialog,
	DialogBackdrop,
	DialogCloseTrigger,
	DialogContent,
	DialogPositioner,
	DialogTrigger,
} from "@/components/dialog";
import {ErrorMessage} from "@/components/error-message";
import {Icon} from "@/components/icon";
import {IconButton} from "@/components/icon-button";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {toast} from "@/components/toaster";
import {Flex, HStack, styled} from "@/styled-system/jsx";
import {Portal} from "@ark-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {FileArchiveIcon} from "lucide-react";
import {useSearchParams} from "next/navigation";
import {useTransition} from "react";
import {useForm} from "react-hook-form";
import slugify from "slugify";
import {z} from "zod";

type TExportSchema = z.infer<typeof ExportSchema>;
const ExportSchema = z.object({
	filename: z.string().trim().min(2).max(50),
});

export function Export() {
	const searchParams = useSearchParams();

	const [pending, startTransition] = useTransition();

	const form = useForm<TExportSchema>({
		resolver: zodResolver(ExportSchema),
		defaultValues: {
			filename: "Expenses",
		},
	});

	return (
		<Dialog>
			{(api) => (
				<>
					<DialogTrigger asChild>
						<IconButton variant="outline" disabled={pending}>
							<Icon>
								<FileArchiveIcon />
							</Icon>
						</IconButton>
					</DialogTrigger>
					<Portal>
						<DialogBackdrop />
						<DialogPositioner>
							<DialogContent w="24rem" p={8}>
								<styled.form
									onSubmit={form.handleSubmit(({filename}) => {
										return startTransition(async () => {
											const u = "/expenses/export";
											const s = new URLSearchParams(searchParams);

											s.delete("page");
											s.delete("size");
											s.set("filename", filename);

											try {
												const response = await fetch(`${u}?${s.toString()}`);

												const blob = await response.blob();

												const url = URL.createObjectURL(blob);
												const link = document.createElement("a");

												link.href = url;
												link.download = slugify(filename, {lower: true});
												link.click();

												URL.revokeObjectURL(url);
												api.close();
											} catch {
												toast.error({
													title: "Error",
													description: "Something went wrong",
												});
											}
										});
									})}
								>
									<Flex direction="column" gap={1.5}>
										<Label htmlFor="expenses.export.filename">File Name</Label>
										<Input
											id="expenses.export.filename"
											size="lg"
											{...form.register("filename")}
										/>
										<ErrorMessage>
											{form.formState.errors.filename?.message}
										</ErrorMessage>
									</Flex>

									<HStack mt={8} gap={4}>
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
										<Button w="full" size="lg" type="submit" disabled={pending}>
											Export
										</Button>
									</HStack>
								</styled.form>
							</DialogContent>
						</DialogPositioner>
					</Portal>
				</>
			)}
		</Dialog>
	);
}
