import {styled} from '@/styled-system/jsx';
import {icon} from '@/styled-system/recipes';
import {ark} from '@ark-ui/react';

export const Icon = styled(ark.svg, icon, {
	shouldForwardProp(key) {
		return ['strokeWidth'].includes(key);
	},
	defaultProps: {
		asChild: true,
		strokeWidth: '1.66667',
	},
});
