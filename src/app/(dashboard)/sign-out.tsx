"use client";

import {Icon} from "@/components/icon";
import {HTMLStyledProps, styled} from "@/styled-system/jsx";
import {logout} from "@/utils/mutations";
import {PowerIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {forwardRef} from "react";

export const Signout = forwardRef<HTMLButtonElement, HTMLStyledProps<"button">>(
	function Signout(props, ref) {
		const router = useRouter();

		return (
			<styled.button
				ref={ref}
				{...props}
				onClick={() => {
					logout().then(() => {
						router.push("/login");
					});
				}}
			>
				<Icon>
					<PowerIcon />
				</Icon>
				<styled.span>Sign out</styled.span>
			</styled.button>
		);
	},
);
