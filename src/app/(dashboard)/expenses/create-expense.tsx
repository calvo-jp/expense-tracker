import {Button} from '@/components/button';
import {Icon} from '@/components/icon';
import {PlusIcon} from 'lucide-react';

export function CreateExpense() {
	return (
		<Button variant="outline">
			<Icon>
				<PlusIcon />
			</Icon>
			Add new
		</Button>
	);
}
