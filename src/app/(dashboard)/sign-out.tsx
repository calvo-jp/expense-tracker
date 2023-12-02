"use client";

import {Icon} from "@/components/icon";
import {HTMLStyledProps, styled} from "@/styled-system/jsx";
import {PowerIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {forwardRef} from "react";
import {logout} from "./actions";

export const Signout = forwardRef<
	HTMLButtonElement,
	Omit<HTMLStyledProps<"button">, "children">
>(function Signout({onClick, ...props}, ref) {
	const router = useRouter();

	return (
		<styled.button
			ref={ref}
			onClick={(e) => {
				onClick?.(e);
				logout().then(() => {
					router.push("/login");
				});
			}}
			{...props}
		>
			<Icon>
				<PowerIcon />
			</Icon>
			<styled.span>Sign out</styled.span>
		</styled.button>
	);
});
