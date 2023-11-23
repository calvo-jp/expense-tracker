'use client';

import {token} from '@/styled-system/tokens';
import {createToaster} from '@ark-ui/react';
import {XIcon} from 'lucide-react';
import {Icon} from './icon';
import {IconButton} from './icon-button';
import {Toast, ToastCloseTrigger, ToastDescription, ToastTitle} from './toast';

export const [Toaster, toast] = createToaster({
	max: 5,
	offsets: token('spacing.3'),
	zIndex: parseInt(token('zIndex.toast', '9999')),
	duration: 5000,
	placement: 'bottom-end',
	render(toast) {
		return (
			<Toast>
				<ToastTitle>{toast.title}</ToastTitle>
				<ToastDescription>{toast.description}</ToastDescription>
				<ToastCloseTrigger asChild>
					<IconButton size="sm" variant="link">
						<Icon>
							<XIcon />
						</Icon>
					</IconButton>
				</ToastCloseTrigger>
			</Toast>
		);
	},
});
