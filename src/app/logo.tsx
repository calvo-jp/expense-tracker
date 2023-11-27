import {HTMLStyledProps, styled} from "@/styled-system/jsx";
import {forwardRef} from "react";

export const Logo = forwardRef<SVGSVGElement, HTMLStyledProps<"svg">>(
	function Logo(props, ref) {
		return (
			<styled.svg
				ref={ref}
				width="auto"
				height={8}
				viewBox="0 0 53 44"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<styled.path
					d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
					fill="currentColor"
				/>
			</styled.svg>
		);
	},
);
