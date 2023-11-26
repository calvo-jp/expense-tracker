import {styled} from '@/styled-system/jsx';
import {toast} from '@/styled-system/recipes';
import {createStyleContext} from '@/utils/create-style-context';
import {Toast as parts} from '@ark-ui/react';

const {withProvider, withContext} = createStyleContext(toast);

export const Toast = withProvider(
	styled(parts.Root, {
		base: {
			shadow: 'none',
			borderWidth: '1px',
		},
	}),
	'root',
);
export const ToastTitle = withContext(styled(parts.Title), 'title');
export const ToastDescription = withContext(
	styled(parts.Description),
	'description',
);
export const ToastCloseTrigger = withContext(
	styled(parts.CloseTrigger),
	'closeTrigger',
);
