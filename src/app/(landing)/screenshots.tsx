import {
	Carousel,
	CarouselControl,
	CarouselIndicator,
	CarouselIndicatorGroup,
	CarouselItem,
	CarouselItemGroup,
	CarouselNextTrigger,
	CarouselPrevTrigger,
	CarouselViewport,
} from "@/components/carousel";
import {Icon} from "@/components/icon";
import {IconButton} from "@/components/icon-button";
import {Image} from "@/components/next-js/image";
import {css} from "@/styled-system/css";
import {Box} from "@/styled-system/jsx";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";

export function Screenshots() {
	return (
		<Box py={24}>
			<Carousel>
				<CarouselViewport rounded="none!">
					<CarouselItemGroup>
						{images.map((image, index) => (
							<CarouselItem key={image} index={index}>
								<Image
									src={image}
									alt=""
									width={1100}
									height={600}
									className={css({
										h: "24rem",
										w: "full",
										objectFit: "cover",
										objectPosition: "center",
									})}
								/>
							</CarouselItem>
						))}
					</CarouselItemGroup>
					<CarouselControl>
						<CarouselPrevTrigger asChild>
							<IconButton size="sm" variant="link">
								<Icon>
									<ChevronLeftIcon />
								</Icon>
							</IconButton>
						</CarouselPrevTrigger>
						<CarouselIndicatorGroup>
							{images.map((image, index) => (
								<CarouselIndicator
									key={image}
									index={index}
									aria-label={`Slide ${index + 1}`}
								/>
							))}
						</CarouselIndicatorGroup>
						<CarouselNextTrigger asChild>
							<IconButton size="sm" variant="link">
								<Icon>
									<ChevronRightIcon />
								</Icon>
							</IconButton>
						</CarouselNextTrigger>
					</CarouselControl>
				</CarouselViewport>
			</Carousel>
		</Box>
	);
}

const images = [
	"https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	"https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
	"https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];
