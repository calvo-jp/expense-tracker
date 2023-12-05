import {
	Tabs,
	TabsContent,
	TabsIndicator,
	TabsList,
	TabsTrigger,
} from "@/components/tabs";
import {Box, Divider, Flex, styled} from "@/styled-system/jsx";
import path from "path";
import {z} from "zod";
import {parseAllMarkdownFiles} from "./utils";

export async function HowItWorks() {
	const items = await getItems();

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
				<TabsList pos="relative">
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
							transition="all token(durations.slow)"
							_selected={{
								bg: "bg.subtle",
							}}
						>
							<styled.span fontFamily="mono">{index + 1}.</styled.span>
							<styled.span>{item.label}</styled.span>
						</TabsTrigger>
					))}

					<TabsIndicator bg="gray.a5" h={5} w={0.5} />
				</TabsList>

				{items.map((item) => (
					<TabsContent key={item.label} value={item.label} asChild>
						<RawHtml>{item.content}</RawHtml>
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
							<RawHtml>{item.content}</RawHtml>
						</Box>
					</Flex>
				))}
			</Flex>
		</Box>
	);
}

function RawHtml({children}: {children: string}) {
	return (
		<styled.div
			color="fg.muted"
			fontSize={{
				base: "sm",
				lg: "md",
			}}
			css={{
				"& p": {
					mt: {
						base: 5,
						_first: 0,
					},
				},
				"& img": {
					w: {
						base: "full",
						lg: "2/3",
					},
				},
			}}
			dangerouslySetInnerHTML={{
				__html: children,
			}}
		/>
	);
}

const ItemSchema = z.object({
	label: z.string(),
	content: z.string(),
});

async function getItems() {
	return parseAllMarkdownFiles(
		path.join(process.cwd(), "src/assets/markdown/how-it-works"),
		(result) => {
			return ItemSchema.parse({
				label: result.meta.label,
				content: result.html,
			});
		},
	);
}
