import {styled} from "@/styled-system/jsx";
import {Assign, HTMLStyledProps} from "@/styled-system/types";
import {HTMLArkProps, ark} from "@ark-ui/react";
import {forwardRef} from "react";

const Component = styled(
	ark.div,
	{
		base: {
			color: "red.a11",
			fontSize: "sm",
			lineHeight: "none",
		},
	},
	{
		defaultProps: {
			role: "alert",
		},
	},
);

export const ErrorMessage = forwardRef<
	HTMLDivElement,
	Assign<HTMLArkProps<"div">, HTMLStyledProps<"div">>
>(function ErrorMessage(props, ref) {
	return props.children ? <Component ref={ref} {...props} /> : null;
});
