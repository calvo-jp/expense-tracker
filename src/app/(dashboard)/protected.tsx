"use client";

import {Flex} from "@/styled-system/jsx";
import {useConditionalRedirect} from "@/utils/use-conditional-redirect";
import {useSession} from "next-auth/react";
import {PropsWithChildren} from "react";
import {Spinner} from "../spinner";

/*
 *
 * next-auth middleware has issues with app dir
 * this is a workaround to protect private routes
 * while version 5 stable is not yet released
 *
 */

export function Protected({children}: PropsWithChildren) {
	const session = useSession();

	useConditionalRedirect(
		session.status === "unauthenticated",
		`/login?callbackUrl=${encodeURIComponent(window.location.toString())}`,
	);

	return session.status === "authenticated" ? children : <Loader />;
}

function Loader() {
	return (
		<Flex minH="screen" alignItems="center" justifyContent="center">
			<Spinner w={16} h={16} />
		</Flex>
	);
}
