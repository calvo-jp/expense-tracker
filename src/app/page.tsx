import {Button} from '@/components/button';
import {Link} from '@/components/next-js/link';
import {Flex, HStack, Spacer, styled} from '@/styled-system/jsx';

export default async function Index() {
	return (
		<styled.div>
			<Flex
				h="navbar.height"
				px={8}
				py={3}
				alignItems="center"
				borderBottomWidth="1px"
			>
				<Spacer />

				<HStack gap={3}>
					<Button asChild variant="ghost">
						<Link href="/login">Login</Link>
					</Button>
					<Button asChild variant="outline">
						<Link href="/register">Register</Link>
					</Button>
				</HStack>
			</Flex>
		</styled.div>
	);
}

const FAQS = [
	{id: 'P001', name: 'MacBook Pro', stock: 12, price: '$1999.00'},
	{id: 'P002', name: 'AirPods Pro', stock: 25, price: '$249.00'},
	{id: 'P003', name: 'Leather Wallet', stock: 50, price: '$79.00'},
];
