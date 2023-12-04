import {Icon} from "@/components/icon";
import {Link} from "@/components/next-js/link";
import {Box, Grid, GridItem, VisuallyHidden, styled} from "@/styled-system/jsx";
import {InstagramIcon, LinkedinIcon, TwitterIcon} from "lucide-react";
import {Subscribe} from "./subscribe";

export function Footer() {
	return (
		<styled.footer
			borderTopWidth="1px"
			mt={{
				base: 24,
				lg: 40,
			}}
			py={{
				base: 16,
				lg: 20,
			}}
		>
			<Box
				px={{
					base: 4,
					lg: 8,
				}}
				mx="auto"
				maxW="breakpoint-md"
			>
				<Grid
					columns={{
						lg: 3,
					}}
					gap={{
						base: 16,
						lg: 1,
					}}
				>
					<GridItem>
						<Box mb={5}>&copy; Expense Tracker {new Date().getFullYear()}</Box>

						<Socials />
					</GridItem>
					<GridItem>
						<QuickLinks />
					</GridItem>
					<GridItem>
						<Subscribe />
					</GridItem>
				</Grid>
			</Box>
		</styled.footer>
	);
}

function Socials() {
	return (
		<styled.nav>
			<styled.ul gap={3} display="flex">
				{socials.map((social) => (
					<styled.li key={social.name}>
						<Link
							href={social.href}
							rel="noreferrer noopener"
							target="_blank"
							prefetch={false}
						>
							<Icon>{social.icon}</Icon>
							<VisuallyHidden>{social.name}</VisuallyHidden>
						</Link>
					</styled.li>
				))}
			</styled.ul>
		</styled.nav>
	);
}

const socials = [
	{
		name: "Instagram",
		href: "#",
		icon: <InstagramIcon />,
	},
	{
		name: "Twitter",
		href: "#",
		icon: <TwitterIcon />,
	},
	{
		name: "Linkedin",
		href: "#",
		icon: <LinkedinIcon />,
	},
];

function QuickLinks() {
	return (
		<>
			<Box fontFamily="heading" textTransform="uppercase" color="fg.subtle">
				Quick Links
			</Box>
			<styled.nav mt={5}>
				<styled.ul>
					{quickLinks.map((link) => (
						<styled.li key={link.path}>
							<Link href={link.path}>{link.label}</Link>
						</styled.li>
					))}
				</styled.ul>
			</styled.nav>
		</>
	);
}

const quickLinks = [
	{
		label: "About",
		path: "/#about",
	},
	{
		label: "Features",
		path: "/#features",
	},
	{
		label: "How It Works",
		path: "/#how-it-works",
	},
	{
		label: "Testimonials",
		path: "/#testimonials",
	},
	{
		label: "Faqs",
		path: "/#faqs",
	},
	{
		label: "Contact Us",
		path: "/#contact-us",
	},
];
