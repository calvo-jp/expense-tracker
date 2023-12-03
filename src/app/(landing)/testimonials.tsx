import {Avatar, AvatarImage} from "@/components/avatar";
import {CarouselPrevTrigger} from "@/components/carousel";
import {Icon} from "@/components/icon";
import {
	Box,
	Center,
	Flex,
	Grid,
	GridItem,
	HStack,
	styled,
} from "@/styled-system/jsx";
import {arrayChunk} from "@/utils/array-chunk";
import {
	Carousel,
	CarouselIndicator,
	CarouselIndicatorGroup,
	CarouselItem,
	CarouselItemGroup,
	CarouselNextTrigger,
	CarouselViewport,
} from "@ark-ui/react";
import {ChevronLeftIcon, ChevronRightIcon, QuoteIcon} from "lucide-react";

export function Testimonials() {
	const chunks = arrayChunk(testimonials, 2);

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

			<Carousel>
				<Flex mt={12} gap={6} alignItems="center">
					<CarouselPrevTrigger asChild>
						<Trigger flexShrink={0}>
							<Icon size="2xl">
								<ChevronLeftIcon />
							</Icon>
						</Trigger>
					</CarouselPrevTrigger>
					<CarouselViewport asChild>
						<Box pos="relative" overflow="hidden">
							<CarouselItemGroup>
								{chunks.map((list, index) => (
									<CarouselItem key={index} index={index} asChild>
										<Grid columns={2} gap={6}>
											{list.map((item) => (
												<GridItem key={item.id}>
													<Testimony data={item} />
												</GridItem>
											))}
										</Grid>
									</CarouselItem>
								))}
							</CarouselItemGroup>
						</Box>
					</CarouselViewport>
					<CarouselNextTrigger asChild>
						<Trigger flexShrink={0}>
							<Icon size="2xl">
								<ChevronRightIcon />
							</Icon>
						</Trigger>
					</CarouselNextTrigger>
				</Flex>

				<Center mt={10}>
					<CarouselIndicatorGroup asChild>
						<HStack>
							{chunks.map((_, index) => (
								<CarouselIndicator key={index} index={index} asChild>
									<Circle aria-label={`Slide ${index}`} />
								</CarouselIndicator>
							))}
						</HStack>
					</CarouselIndicatorGroup>
				</Center>
			</Carousel>
		</Box>
	);
}

const Trigger = styled("button", {
	base: {
		cursor: "pointer",
		_disabled: {
			color: "fg.disabled",
			cursor: "not-allowed",
		},
	},
});

const Circle = styled("button", {
	base: {
		w: 3,
		h: 3,
		cursor: "pointer",
		border: "1px solid token(colors.fg.default)",
		rounded: "full",
		transition: "background token(durations.slow)",
		_current: {
			bg: "fg.default",
		},
	},
});

interface TestimonyProps {
	data: {
		id: string;
		message: string;
		author: {
			name: string;
			company: {
				name: string;
				position: string;
			};
		};
	};
}

function Testimony(props: TestimonyProps) {
	const {id, author, message} = props.data;

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

			<styled.p flexGrow={1}>{message}</styled.p>

			<HStack>
				<Avatar>
					<AvatarImage src={`https://i.pravatar.cc/300?u=${id}`} />
				</Avatar>
				<Box>
					<Box fontSize="sm" fontWeight="medium">
						{author.name}
					</Box>
					<Box fontSize="xs" color="fg.muted">
						{author.company.position} at {author.company.name}
					</Box>
				</Box>
			</HStack>
		</Flex>
	);
}

const testimonials: TestimonyProps["data"][] = [
	{
		id: crypto.randomUUID(),
		author: {
			name: "Mark Zuckerberg",
			company: {
				name: "Facebook",
				position: "CEO",
			},
		},
		message:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dicta nostrum unde natus ducimus iste itaque reiciendis repellat perspiciatis beatae",
	},
	{
		id: crypto.randomUUID(),
		author: {
			name: "Mark Zuckerberg",
			company: {
				name: "Facebook",
				position: "CEO",
			},
		},
		message:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dicta nostrum unde natus ducimus iste itaque reiciendis repellat perspiciatis beatae",
	},
	{
		id: crypto.randomUUID(),
		author: {
			name: "Mark Zuckerberg",
			company: {
				name: "Facebook",
				position: "CEO",
			},
		},
		message:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dicta nostrum unde natus ducimus iste itaque reiciendis repellat perspiciatis beatae",
	},
	{
		id: crypto.randomUUID(),
		author: {
			name: "Mark Zuckerberg",
			company: {
				name: "Facebook",
				position: "CEO",
			},
		},
		message:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dicta nostrum unde natus ducimus iste itaque reiciendis repellat perspiciatis beatae",
	},
	{
		id: crypto.randomUUID(),
		author: {
			name: "Mark Zuckerberg",
			company: {
				name: "Facebook",
				position: "CEO",
			},
		},
		message:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dicta nostrum unde natus ducimus iste itaque reiciendis repellat perspiciatis beatae",
	},
	{
		id: crypto.randomUUID(),
		author: {
			name: "Mark Zuckerberg",
			company: {
				name: "Facebook",
				position: "CEO",
			},
		},
		message:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dicta nostrum unde natus ducimus iste itaque reiciendis repellat perspiciatis beatae",
	},
];
