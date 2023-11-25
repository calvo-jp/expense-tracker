import {
	Accordion,
	AccordionItem,
	AccordionItemContent,
	AccordionItemIndicator,
	AccordionItemTrigger,
} from '@/components/accordion';
import {Button} from '@/components/button';
import {Link} from '@/components/next-js/link';
import {Box, Flex, HStack, Spacer, styled} from '@/styled-system/jsx';
import {ChevronDownIcon} from 'lucide-react';

export default async function Index() {
	return (
		<styled.div>
			<Flex
				h="navbar.height"
				px={8}
				py={3}
				borderBottomWidth="1px"
				alignItems="center"
			>
				<Spacer />

				<HStack gap={5}>
					<Link href="/login">Login</Link>
					<Button asChild variant="outline">
						<Link href="/register">Register</Link>
					</Button>
				</HStack>
			</Flex>

			<Box mt={16}>
				<Accordion mt={16} multiple>
					{FAQS.map((item) => (
						<AccordionItem key={item.id} value={item.id}>
							<AccordionItemTrigger>
								{item.name}
								<AccordionItemIndicator>
									<ChevronDownIcon />
								</AccordionItemIndicator>
							</AccordionItemTrigger>
							<AccordionItemContent>
								<div>
									Pudding donut gummies chupa chups oat cake marzipan biscuit
									tart. Dessert macaroon ice cream bonbon jelly. Jelly topping
									tiramisu halvah lollipop.
								</div>
							</AccordionItemContent>
						</AccordionItem>
					))}
				</Accordion>
			</Box>
		</styled.div>
	);
}

const FAQS = [
	{id: 'P001', name: 'MacBook Pro', stock: 12, price: '$1999.00'},
	{id: 'P002', name: 'AirPods Pro', stock: 25, price: '$249.00'},
	{id: 'P003', name: 'Leather Wallet', stock: 50, price: '$79.00'},
];
