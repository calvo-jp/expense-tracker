"use client";

import {Button} from "@/components/button";
import {Input} from "@/components/input";
import {Textarea} from "@/components/textarea";
import {toast} from "@/components/toaster";
import {Box, styled} from "@/styled-system/jsx";

export function ContactUs() {
	return (
		<Box id="contact-us" maxW="breakpoint-md" mx="auto" py={24} px={8}>
			<styled.h2
				textAlign="center"
				fontFamily="heading"
				fontWeight="bold"
				fontSize="4xl"
			>
				Get in Touch
			</styled.h2>

			<styled.form
				mt={12}
				maxW="24rem"
				mx="auto"
				display="flex"
				flexDir="column"
				gap={5}
				onSubmit={(e) => {
					e.preventDefault();

					toast.create({
						title: "Error",
						description: "This feature is not yet implemented",
					});
				}}
			>
				<Input size="xl" placeholder="Name" />
				<Input size="xl" placeholder="Email" />
				<Textarea size="xl" placeholder="Message" rows={4} />
				<Button type="submit" size="xl" display="block">
					Submit
				</Button>
			</styled.form>
		</Box>
	);
}
