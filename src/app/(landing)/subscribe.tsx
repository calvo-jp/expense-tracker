"use client";

import {Button} from "@/components/button";
import {Input} from "@/components/input";
import {toast} from "@/components/toaster";
import {Box, styled} from "@/styled-system/jsx";

export function Subscribe() {
	return (
		<>
			<Box fontFamily="heading" textTransform="uppercase" color="fg.subtle">
				Newsletter
			</Box>
			<styled.form
				mt={5}
				onSubmit={(e) => {
					e.preventDefault();

					toast.create({
						title: "Error",
						description: "This feature is not yet implemented",
					});
				}}
			>
				<Input placeholder="Email" />
				<Button type="submit" w="full" mt={4}>
					Subscribe
				</Button>
			</styled.form>
		</>
	);
}
