import {Icon} from '@/components/icon';
import {IconButton} from '@/components/icon-button';
import {FileArchiveIcon} from 'lucide-react';

export function Export() {
	return (
		<IconButton type="submit" variant="outline">
			<Icon>
				<FileArchiveIcon />
			</Icon>
		</IconButton>
	);
}
