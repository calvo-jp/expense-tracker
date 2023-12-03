import {Avatar, AvatarImage} from "@/components/avatar";
import {Icon} from "@/components/icon";
import {Box, Flex, Grid, GridItem, HStack, styled} from "@/styled-system/jsx";
import {QuoteIcon} from "lucide-react";

export function Testimonials() {
	return (
		<Box id="testimonials" maxW="breakpoint-lg" mx="auto" py={24} px={8}>
			<styled.h2
				textAlign="center"
				fontFamily="heading"
				fontWeight="bold"
				fontSize="4xl"
			>
				Testimonials
			</styled.h2>

			<Grid mt={12} columns={2} gap={6}>
				<GridItem>
					<Testimony />
				</GridItem>
				<GridItem>
					<Testimony />
				</GridItem>
			</Grid>
		</Box>
	);
}

function Testimony() {
	return (
		<Flex
			p={8}
			borderWidth="1px"
			rounded="sm"
			flexDir="column"
			gap={6}
			bg="bg.subtle"
		>
			<Icon size="xl" color="fg.disabled">
				<QuoteIcon />
			</Icon>

			<styled.p flexGrow={1}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dicta
				nostrum unde natus ducimus iste itaque reiciendis repellat perspiciatis
				beatae?
			</styled.p>

			<HStack>
				<Avatar>
					<AvatarImage src="https://i.pravatar.cc/300" />
				</Avatar>
				<Box>
					<Box fontSize="sm" fontWeight="medium">
						Mark Zuckerberg
					</Box>
					<Box fontSize="xs" color="fg.muted">
						CEO at Facebook
					</Box>
				</Box>
			</HStack>
		</Flex>
	);
}
