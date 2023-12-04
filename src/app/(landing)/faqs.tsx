import {
	Accordion,
	AccordionItem,
	AccordionItemContent,
	AccordionItemIndicator,
	AccordionItemTrigger,
} from "@/components/accordion";
import {Icon} from "@/components/icon";
import {Box, styled} from "@/styled-system/jsx";
import {ChevronDownIcon} from "lucide-react";
import path from "path";
import {z} from "zod";
import {parseAllMarkdownFiles} from "./utils";

export async function Faqs() {
	const faqs = await getItems();

	return (
		<Box id="faqs" maxW="breakpoint-md" mx="auto" py={24} px={8}>
			<styled.h2
				textAlign="center"
				fontFamily="heading"
				fontWeight="bold"
				fontSize="4xl"
			>
				Faqs
			</styled.h2>

			<Accordion mt={12} multiple defaultValue={[faqs[0].q]}>
				{faqs.map(({q, a}) => {
					return (
						<AccordionItem key={a} value={a}>
							<AccordionItemTrigger px={4}>
								{q}
								<AccordionItemIndicator>
									<Icon>
										<ChevronDownIcon />
									</Icon>
								</AccordionItemIndicator>
							</AccordionItemTrigger>
							<AccordionItemContent px={4}>
								<Box
									dangerouslySetInnerHTML={{
										__html: a,
									}}
								/>
							</AccordionItemContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</Box>
	);
}

async function getItems() {
	return await parseAllMarkdownFiles(
		path.join(process.cwd(), "src/assets/markdown/faqs"),
		(result) => {
			return ItemSchema.parse({
				q: result.meta.q,
				a: result.html,
			});
		},
	);
}

type TItemSchema = z.infer<typeof ItemSchema>;
const ItemSchema = z.object({
	q: z.string(),
	a: z.string(),
});
