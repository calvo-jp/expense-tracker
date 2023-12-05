import {Image} from "@/components/next-js/image";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/tabs";
import {Box, Divider, Flex, styled} from "@/styled-system/jsx";

export function HowItWorks() {
	return (
		<Box
			id="how-it-works"
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
				How It Works
			</styled.h2>

			<Tabs
				mt={14}
				orientation="vertical"
				defaultValue={items[0].label}
				display={{
					base: "none",
					lg: "flex",
				}}
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

			<Flex
				mt={10}
				flexDir="column"
				display={{
					base: "flex",
					lg: "none",
				}}
			>
				{items.map((item, index) => (
					<Flex key={item.label} flexDir="column">
						{index > 0 && (
							<Divider
								w="1px"
								h={10}
								mx="auto"
								color="border.muted"
								orientation="vertical"
							/>
						)}

						<Flex
							rounded="sm"
							bg="bg.subtle"
							w={10}
							h={10}
							mx="auto"
							alignItems="center"
							justifyContent="center"
							fontSize="lg"
							fontFamily="mono"
							fontWeight="bold"
							border="1px solid token(colors.border.muted)"
						>
							{index + 1}
						</Flex>
						<Divider
							w="1px"
							h={10}
							mx="auto"
							color="border.muted"
							orientation="vertical"
						/>
						<Box py={5} textAlign="center">
							<Box fontFamily="heading">{item.label}</Box>
							<Box>{item.content}</Box>
						</Box>
					</Flex>
				))}
			</Flex>
		</Box>
	);
}

const items = [
	{
		label: "Item One",
		content: (
			<>
				<styled.p
					color="fg.muted"
					fontSize={{
						base: "sm",
						lg: "md",
					}}
				>
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
					w={{
						base: "full",
						lg: "2/3",
					}}
				/>
			</>
		),
	},
	{
		label: "Item Two",
		content: (
			<>
				<styled.p
					color="fg.muted"
					fontSize={{
						base: "sm",
						lg: "md",
					}}
				>
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
					w={{
						base: "full",
						lg: "2/3",
					}}
				/>
			</>
		),
	},
	{
		label: "Item Three",
		content: (
			<>
				<styled.p
					color="fg.muted"
					fontSize={{
						base: "sm",
						lg: "md",
					}}
				>
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
					w={{
						base: "full",
						lg: "2/3",
					}}
				/>
			</>
		),
	},
];
