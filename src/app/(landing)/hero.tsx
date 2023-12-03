import {Button} from "@/components/button";
import {Link} from "@/components/next-js/link";
import {Box, Flex, styled} from "@/styled-system/jsx";

export function Hero() {
	return (
		<Box id="about" maxW="breakpoint-lg" mx="auto" pt={32} pb={24} px={8}>
			<Flex>
				<Box flexShrink={0}>
					<styled.h1 fontFamily="heading" fontSize="6xl" fontWeight="extrabold">
						Spend wisely!
					</styled.h1>
					<styled.p mt={3} fontSize="lg" maxW="38rem" color="fg.muted">
						Stay in control of your finances - effortlessly monitor daily
						expenses and gain valuable spending insights.
					</styled.p>
					<Button w="10rem" mt={8} size="xl" asChild>
						<Link href="/register">Get Started</Link>
					</Button>
				</Box>

				{/* TODO: image */}
			</Flex>
		</Box>
	);
}
