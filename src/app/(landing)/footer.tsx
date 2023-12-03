import {Button} from "@/components/button";
import {Icon} from "@/components/icon";
import {Input} from "@/components/input";
import {Box, Grid, GridItem, HStack, styled} from "@/styled-system/jsx";
import {InstagramIcon, LinkedinIcon, TwitterIcon} from "lucide-react";

export function Footer() {
	return (
		<styled.footer borderTopWidth="1px" mt={40} py={20}>
			<Box px={8} mx="auto" maxW="breakpoint-md">
				<Grid columns={3}>
					<GridItem>
						<Box>&copy; Expense Tracker {new Date().getFullYear()}</Box>

						<HStack mt={5} gap={2.5}>
							<Icon>
								<InstagramIcon />
							</Icon>
							<Icon>
								<TwitterIcon />
							</Icon>
							<Icon>
								<LinkedinIcon />
							</Icon>
						</HStack>
					</GridItem>
					<GridItem>
						<Box
							fontFamily="heading"
							textTransform="uppercase"
							color="fg.disabled"
						>
							Quick Links
						</Box>
						<styled.nav mt={5}>
							<styled.ul>
								<styled.li>About</styled.li>
								<styled.li>Features</styled.li>
								<styled.li>Faqs</styled.li>
								<styled.li>Contact Us</styled.li>
								<styled.li>Sign In</styled.li>
								<styled.li>Create Account</styled.li>
							</styled.ul>
						</styled.nav>
					</GridItem>
					<GridItem>
						<Box
							fontFamily="heading"
							textTransform="uppercase"
							color="fg.disabled"
						>
							Newsletter
						</Box>
						<styled.form mt={5}>
							<Input placeholder="Email" />
							<Button w="full" mt={4}>
								Subscribe
							</Button>
						</styled.form>
					</GridItem>
				</Grid>
			</Box>
		</styled.footer>
	);
}
