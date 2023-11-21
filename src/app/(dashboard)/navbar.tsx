import {Avatar, AvatarFallback, AvatarImage} from '@/components/avatar';
import {Icon} from '@/components/icon';
import {Flex, HStack, Spacer, styled} from '@/styled-system/jsx';
import {BellIcon} from 'lucide-react';

export function Navbar() {
	return (
		<styled.header h="var(--navbar-height)" borderBottomWidth="1px">
			<Flex h="full" px={4} alignItems="center">
				<Spacer />
				<HStack gap={4}>
					<Icon size="lg">
						<BellIcon />
					</Icon>

					<Avatar>
						<AvatarFallback>JP</AvatarFallback>
						<AvatarImage src="https://i.pravatar.cc/150" alt="" />
					</Avatar>
				</HStack>
			</Flex>
		</styled.header>
	);
}
