'use client';

import {Button} from '@/components/button';
import {
	Drawer,
	DrawerBackdrop,
	DrawerBody,
	DrawerCloseTrigger,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerPositioner,
	DrawerTrigger,
} from '@/components/drawer';
import {Icon} from '@/components/icon';
import {IconButton} from '@/components/icon-button';
import {Flex} from '@/styled-system/jsx';
import {Portal} from '@ark-ui/react';
import {ChevronRightIcon, SearchIcon} from 'lucide-react';

export function Filter() {
	return (
		<Drawer lazyMount>
			<DrawerTrigger asChild>
				<IconButton variant="outline">
					<Icon>
						<SearchIcon />
					</Icon>
				</IconButton>
			</DrawerTrigger>
			<Portal>
				<DrawerBackdrop />
				<DrawerPositioner w="token(sizes.xs)">
					<DrawerContent>
						<DrawerHeader p={0}>
							<Flex h="navbar.height" pr={4} pl={6} alignItems="center">
								<DrawerCloseTrigger asChild>
									<IconButton variant="outline">
										<Icon>
											<ChevronRightIcon />
										</Icon>
									</IconButton>
								</DrawerCloseTrigger>
							</Flex>
						</DrawerHeader>

						<DrawerBody></DrawerBody>

						<DrawerFooter gap="3" justifyContent="start">
							<DrawerCloseTrigger asChild>
								<Button w="full" variant="outline">
									Cancel
								</Button>
							</DrawerCloseTrigger>
							<Button w="full">Save</Button>
						</DrawerFooter>
					</DrawerContent>
				</DrawerPositioner>
			</Portal>
		</Drawer>
	);
}
