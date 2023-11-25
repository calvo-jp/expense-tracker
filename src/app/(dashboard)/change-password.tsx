'use client';

import {
	Dialog,
	DialogBackdrop,
	DialogContent,
	DialogPositioner,
	DialogTrigger,
} from '@/components/dialog';
import {Icon} from '@/components/icon';
import {MenuItem} from '@/components/menu';
import {Box, HStack, styled} from '@/styled-system/jsx';
import {Portal} from '@ark-ui/react';
import {LockIcon} from 'lucide-react';

export function ChangePassword() {
	return (
		<Dialog
			lazyMount
			unmountOnExit
			closeOnEscapeKeyDown={false}
			closeOnInteractOutside={false}
		>
			<DialogTrigger asChild>
				<MenuItem id="navbar.profile-settings.change-password">
					<HStack>
						<Icon>
							<LockIcon />
						</Icon>
						<styled.span>Change Password</styled.span>
					</HStack>
				</MenuItem>
			</DialogTrigger>

			<Portal>
				<DialogBackdrop />
				<DialogPositioner>
					<DialogContent asChild>
						<Box></Box>
					</DialogContent>
				</DialogPositioner>
			</Portal>
		</Dialog>
	);
}
