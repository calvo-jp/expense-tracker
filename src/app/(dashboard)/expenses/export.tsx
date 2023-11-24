import {Icon} from '@/components/icon';
import {IconButton} from '@/components/icon-button';
import {styled} from '@/styled-system/jsx';
import {FileArchiveIcon} from 'lucide-react';

export function Export() {
	return (
		<styled.form
			action={async () => {
				'use server';

				/* logic */
			}}
		>
			<IconButton type="submit" variant="outline">
				<Icon>
					<FileArchiveIcon />
				</Icon>
			</IconButton>
		</styled.form>
	);
}
