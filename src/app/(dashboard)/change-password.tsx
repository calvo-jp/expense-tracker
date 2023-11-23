'use client';

import {Icon} from '@/components/icon';
import {MenuItem} from '@/components/menu';
import {HStack, styled} from '@/styled-system/jsx';
import {LockIcon} from 'lucide-react';

export function ChangePassword() {
	return (
		<MenuItem id="profile-settings-menu--change-password">
			<HStack>
				<Icon>
					<LockIcon />
				</Icon>
				<styled.span>Change Password</styled.span>
			</HStack>
		</MenuItem>
	);
}
