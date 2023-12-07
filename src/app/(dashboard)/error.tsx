"use client";

import {Box} from "@/styled-system/jsx";

interface ErrorBoundaryProps {
	error: Error & {digest?: string};
	reset(): void;
}

export default function ErrorBoundary({error}: ErrorBoundaryProps) {
	return <Box>{error.message}</Box>;
}
