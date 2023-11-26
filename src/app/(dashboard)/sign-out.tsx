'use client';

import {Icon} from '@/components/icon';
import {MenuItem} from '@/components/menu';
import {HStack, styled} from '@/styled-system/jsx';
import {logout} from '@/utils/actions';
import {PowerIcon} from 'lucide-react';
import {startTransition} from 'react';

export function Signout() {
	return (
		<MenuItem id="navbar.profile-settings.signout" asChild>
			<styled.button
				onClick={() => {
					startTransition(() => {
						logout();
					});
				}}
			>
				<HStack>
					<Icon>
						<PowerIcon />
					</Icon>
					<styled.span>Sign out</styled.span>
				</HStack>
			</styled.button>
		</MenuItem>
	);
}
