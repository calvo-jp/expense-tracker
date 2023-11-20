'use client';

import {createToaster} from '@ark-ui/react';
import {XIcon} from 'lucide-react';
import {Icon} from './icon';
import {IconButton} from './icon-button';
import {Toast, ToastCloseTrigger, ToastDescription, ToastTitle} from './toast';

export const [Toaster, toast] = createToaster({
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
