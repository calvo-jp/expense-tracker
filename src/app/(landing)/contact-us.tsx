import {Button} from "@/components/button";
import {Input} from "@/components/input";
import {Textarea} from "@/components/textarea";
import {Box, styled} from "@/styled-system/jsx";

export function ContactUs() {
	return (
		<Box maxW="breakpoint-md" mx="auto" py={24} px={8}>
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
				maxW="26rem"
				mx="auto"
				display="flex"
				flexDir="column"
				gap={5}
			>
				<Input size="xl" placeholder="Name" />
				<Input size="xl" placeholder="Email" />
				<Textarea size="xl" placeholder="Message" />
				<Button size="xl" display="block">
					Submit
				</Button>
			</styled.form>
		</Box>
	);
}
