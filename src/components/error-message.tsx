import {styled} from '@/styled-system/jsx';
import {Assign, HTMLStyledProps} from '@/styled-system/types';
import {HTMLArkProps, ark} from '@ark-ui/react';
import {forwardRef} from 'react';

const StyledArkDiv = styled(ark.div);

type ErrorMessageProps = Assign<HTMLArkProps<'div'>, HTMLStyledProps<'div'>>;

export const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>(
	function ErrorMessage(props, ref) {
		if (!props.children) return null;

		return (
			<StyledArkDiv
				ref={ref}
				color="red.a11"
				fontSize="sm"
				lineHeight="none"
				role="alert"
				{...props}
			/>
		);
	},
);
