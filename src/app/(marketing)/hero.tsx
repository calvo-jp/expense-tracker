import {Button} from "@/components/button";
import {Link} from "@/components/next-js/link";
import {Box, styled} from "@/styled-system/jsx";

export function Hero() {
	return (
		<Box
			id="about"
			maxW="breakpoint-lg"
			mx="auto"
			pt={{
				base: 24,
				lg: 32,
			}}
			pb={{
				base: 16,
				lg: 24,
			}}
			px={{
				base: 4,
				lg: 8,
			}}
		>
			<styled.h1
				fontFamily="heading"
				fontSize={{
					base: "5xl",
					lg: "6xl",
				}}
				fontWeight="extrabold"
				lineHeight="tight"
			>
				Spend wisely!
			</styled.h1>
			<styled.p mt={4} fontSize="lg" maxW="38rem" color="fg.muted">
				Stay in control of your finances - effortlessly monitor daily expenses
				and gain valuable spending insights.
			</styled.p>
			<Button
				w={{
					base: "full",
					lg: "10rem",
				}}
				mt={8}
				size="xl"
				asChild
			>
				<Link href="/register">Get Started</Link>
			</Button>
		</Box>
	);
}
