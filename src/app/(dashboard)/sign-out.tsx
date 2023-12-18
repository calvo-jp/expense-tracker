"use client";

import {Icon} from "@/components/icon";
import {HTMLStyledProps, styled} from "@/styled-system/jsx";
import {PowerIcon} from "lucide-react";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {forwardRef} from "react";

export const Signout = forwardRef<
	HTMLButtonElement,
	Omit<HTMLStyledProps<"button">, "children">
>(function Signout({onClick, ...props}, ref) {
	const router = useRouter();

	return (
		<styled.button
			ref={ref}
			onClick={async (e) => {
				onClick?.(e);
				await signOut();
				router.push("/login");
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
