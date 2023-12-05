import {Avatar, AvatarFallback, AvatarImage} from "@/components/avatar";
import {CarouselPrevTrigger} from "@/components/carousel";
import {Icon} from "@/components/icon";
import {css} from "@/styled-system/css";
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
import {getInitials} from "@/utils/get-initials";
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
import path from "path";
import {z} from "zod";
import {parseAllMarkdownFiles} from "./utils";

export async function Testimonials() {
	const items = await getItems();
	const chunks = arrayChunk(items, 2);

	return (
		<Box
			id="testimonials"
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
				fontSize="4xl"
			>
				Testimonials
			</styled.h2>

			<Carousel
				slidesPerView={1}
				className={css({
					mt: 12,
					display: {
						base: "none",
						lg: "block",
					},
				})}
			>
				<Flex gap={6} alignItems="center">
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
										<Grid
											columns={{
												base: 1,
												lg: 2,
											}}
											gap={6}
										>
											{list.map((item, index) => (
												<GridItem key={index}>
													<Testimonial data={item} />
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
									<Circle aria-label={`Slide ${index + 1}`} />
								</CarouselIndicator>
							))}
						</HStack>
					</CarouselIndicatorGroup>
				</Center>
			</Carousel>

			<Flex
				mt={10}
				flexDir="column"
				gap={5}
				lg={{
					display: "none",
				}}
			>
				{items.map((item, index) => (
					<Testimonial key={index} data={item} />
				))}
			</Flex>
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
		bg: "gray.a5",
		cursor: "pointer",
		rounded: "full",
		transition: "background token(durations.slow)",
		_current: {
			bg: "gray.a11",
		},
	},
});

interface TestimonialProps {
	data: TTestimonialSchema;
}

function Testimonial(props: TestimonialProps) {
	const {author, message} = props.data;

	return (
		<Flex
			p={8}
			borderWidth="1px"
			rounded="sm"
			flexDir="column"
			gap={6}
			bg="bg.subtle"
		>
			<Icon size="xl" color="fg.subtle">
				<QuoteIcon />
			</Icon>

			<styled.div
				flexGrow={1}
				dangerouslySetInnerHTML={{
					__html: message,
				}}
			/>

			<HStack>
				<Avatar>
					<AvatarFallback>{getInitials(author.name)}</AvatarFallback>
					<AvatarImage src={author.photo} />
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

async function getItems() {
	return await parseAllMarkdownFiles(
		path.join(process.cwd(), "src/assets/markdown/testimonials"),
		(result) => {
			return TestimonialSchema.parse({
				author: result.meta.author,
				message: result.html,
			});
		},
	);
}

type TTestimonialSchema = z.infer<typeof TestimonialSchema>;
const TestimonialSchema = z.object({
	author: z.object({
		name: z.string(),
		photo: z.string().url(),
		company: z.object({
			name: z.string(),
			position: z.string(),
		}),
	}),
	message: z.string(),
});
