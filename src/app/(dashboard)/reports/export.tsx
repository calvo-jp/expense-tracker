'use client';

import {Icon} from '@/components/icon';
import {IconButton} from '@/components/icon-button';
import {FileArchiveIcon} from 'lucide-react';
import {useTransition} from 'react';

export function Export() {
	const [pending, startTransition] = useTransition();

	return (
		<IconButton
			variant="outline"
			disabled={pending}
			onClick={() => startTransition(download)}
		>
			<Icon>
				<FileArchiveIcon />
			</Icon>
		</IconButton>
	);
}

async function download() {
	/* logic */
}
