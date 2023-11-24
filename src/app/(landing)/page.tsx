import {Avatar, AvatarFallback} from '@/components/avatar';
import {Button} from '@/components/button';
import {Link} from '@/components/link';
import {Flex, HStack, Spacer, styled} from '@/styled-system/jsx';
import {cookies} from 'next/headers';

export default async function Index() {
	const cookieStore = cookies();

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

				{cookieStore.has('user') ? (
					<Link href="/dashboard">
						<Avatar>
							<AvatarFallback>JP</AvatarFallback>
						</Avatar>
					</Link>
				) : (
					<HStack gap={5}>
						<Link href="/login">Login</Link>
						<Button asChild variant="outline">
							<Link href="/register">Register</Link>
						</Button>
					</HStack>
				)}
			</Flex>
		</styled.div>
	);
}
