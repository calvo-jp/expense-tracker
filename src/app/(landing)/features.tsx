import {Icon} from "@/components/icon";
import {Box, Grid, GridItem, styled} from "@/styled-system/jsx";
import {
	AtomIcon,
	BellIcon,
	CoinsIcon,
	LightbulbIcon,
	RocketIcon,
	WalletIcon,
} from "lucide-react";
import {ReactNode} from "react";

export function Features() {
	return (
		<Box
			id="features"
			maxW="breakpoint-lg"
			mx="auto"
			py={{
				base: 16,
				lg: 24,
			}}
			px={{
				base: 4,
				lg: 8,
			}}
		>
			<styled.h2
				textAlign="center"
				fontFamily="heading"
				fontWeight="bold"
				fontSize={{
					base: "3xl",
					lg: "4xl",
				}}
			>
				Features
			</styled.h2>

			<Grid
				mt={{
					base: 10,
					lg: 12,
				}}
				columns={{
					base: 1,
					lg: 3,
				}}
				gap={5}
				alignItems="center"
			>
				{features.map((feature, index) => (
					<GridItem key={index}>
						<Feature data={feature} />
					</GridItem>
				))}
			</Grid>
		</Box>
	);
}

interface FeatureProps {
	data: {
		icon: ReactNode;
		name: ReactNode;
		description: ReactNode;
	};
}

function Feature(props: FeatureProps) {
	const {icon, name, description} = props.data;

	return (
		<Box borderWidth="1px" p={8} rounded="sm" bg="bg.subtle">
			<Box bg="neutral.a2" w="fit" p={3} rounded="full">
				<Icon size="xl">{icon}</Icon>
			</Box>
			<styled.h3
				mt={4}
				fontFamily="heading"
				fontSize="xl"
				fontWeight="semibold"
			>
				{name}
			</styled.h3>
			<styled.p mt={1} color="fg.muted" fontSize="sm">
				{description}
			</styled.p>
		</Box>
	);
}

const features: FeatureProps["data"][] = [
	{
		icon: <RocketIcon />,
		name: "Feature 1",
		description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ut
    sint voluptatibus sit dolorum consequatur eligendi earum`,
	},
	{
		icon: <CoinsIcon />,
		name: "Feature 2",
		description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ut
    sint voluptatibus sit dolorum consequatur eligendi earum`,
	},
	{
		icon: <LightbulbIcon />,
		name: "Feature 3",
		description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ut
    sint voluptatibus sit dolorum consequatur eligendi earum`,
	},
	{
		icon: <AtomIcon />,
		name: "Feature 4",
		description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ut
    sint voluptatibus sit dolorum consequatur eligendi earum`,
	},
	{
		icon: <WalletIcon />,
		name: "Feature 5",
		description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ut
    sint voluptatibus sit dolorum consequatur eligendi earum`,
	},
	{
		icon: <BellIcon />,
		name: "Feature 6",
		description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ut
    sint voluptatibus sit dolorum consequatur eligendi earum`,
	},
];
