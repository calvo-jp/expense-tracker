"use client";

import {Image} from "@/components/next-js/image";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/tabs";
import {Box, styled} from "@/styled-system/jsx";

export function HowItWorks() {
	return (
		<Box maxW="breakpoint-lg" mx="auto" py={24} px={8}>
			<styled.h2
				textAlign="center"
				fontFamily="heading"
				fontWeight="bold"
				fontSize="4xl"
			>
				How It Works
			</styled.h2>

			<Tabs
				mt={14}
				orientation="vertical"
				defaultValue={items[0].label}
				display="flex"
				gap={12}
			>
				<TabsList>
					{items.map((item, index) => (
						<TabsTrigger
							key={item.label}
							value={item.label}
							display="flex"
							whiteSpace="nowrap"
							flexShrink={0}
							gap={2}
							px={10}
							py={2}
							w="full"
							cursor="pointer"
							borderRight={{
								base: "2px solid transparent",
								_selected: "2px solid token(colors.neutral.a5)",
							}}
							_selected={{
								bg: "bg.subtle",
							}}
						>
							<styled.span fontFamily="mono">{index + 1}.</styled.span>
							<styled.span>{item.label}</styled.span>
						</TabsTrigger>
					))}
				</TabsList>
				{items.map((item) => (
					<TabsContent key={item.label} value={item.label}>
						{item.content}
					</TabsContent>
				))}
			</Tabs>
		</Box>
	);
}

const items = [
	{
		label: "Item One",
		content: (
			<>
				<styled.p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
					inventore tempora totam mollitia, esse repudiandae voluptatem laborum
					at perferendis tenetur.
				</styled.p>
				<Image
					src="https://images.pexels.com/photos/38519/macbook-laptop-ipad-apple-38519.jpeg?auto=compress&cs=tinysrgb&w=800"
					alt=""
					width={600}
					height={200}
					mt={5}
					w="2/3"
				/>
			</>
		),
	},
	{
		label: "Item Two",
		content: (
			<>
				<styled.p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
					inventore tempora totam mollitia, esse repudiandae voluptatem laborum
					at perferendis tenetur.
				</styled.p>
				<Image
					src="https://images.pexels.com/photos/38519/macbook-laptop-ipad-apple-38519.jpeg?auto=compress&cs=tinysrgb&w=800"
					alt=""
					width={600}
					height={200}
					mt={5}
					w="2/3"
				/>
			</>
		),
	},
	{
		label: "Item Three",
		content: (
			<>
				<styled.p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
					inventore tempora totam mollitia, esse repudiandae voluptatem laborum
					at perferendis tenetur.
				</styled.p>
				<Image
					src="https://images.pexels.com/photos/38519/macbook-laptop-ipad-apple-38519.jpeg?auto=compress&cs=tinysrgb&w=800"
					alt=""
					width={600}
					height={200}
					mt={5}
					w="2/3"
				/>
			</>
		),
	},
];
