'use client';

import {
	Drawer,
	DrawerBackdrop,
	DrawerBody,
	DrawerCloseTrigger,
	DrawerContent,
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
		<Drawer>
			<DrawerTrigger asChild>
				<IconButton variant="outline">
					<Icon>
						<SearchIcon />
					</Icon>
				</IconButton>
			</DrawerTrigger>
			<Portal>
				<DrawerBackdrop />
				<DrawerPositioner>
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
					</DrawerContent>
				</DrawerPositioner>
			</Portal>
		</Drawer>
	);
}
