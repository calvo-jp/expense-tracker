'use client';

import {Icon} from '@/components/icon';
import {MenuItem} from '@/components/menu';
import {HStack, styled} from '@/styled-system/jsx';
import {PowerIcon} from 'lucide-react';
import {signOut} from 'next-auth/react';
import {useRouter} from 'next/navigation';

export function SignOut() {
	const router = useRouter();

	return (
		<MenuItem
			id="profile-settings-menu--signout"
			onClick={async () => {
				await signOut({redirect: false});
				router.push('/login');
			}}
		>
			<HStack>
				<Icon>
					<PowerIcon />
				</Icon>
				<styled.span>Sign out</styled.span>
			</HStack>
		</MenuItem>
	);
}
