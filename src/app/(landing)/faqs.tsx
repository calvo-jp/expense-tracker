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

export function Faqs() {
	return (
		<Box maxW="breakpoint-md" mx="auto" py={24} px={8}>
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
								<Box>{a}</Box>
							</AccordionItemContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</Box>
	);
}

const faqs = [
	{
		q: "Question 1?",
		a: "Answer to question 1",
	},
	{
		q: "Question 2?",
		a: "Answer to question 2",
	},
	{
		q: "Question 3?",
		a: "Answer to question 3",
	},
];
