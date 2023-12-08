"use client";

import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@/components/alert";
import {Box} from "@/styled-system/jsx";
import {AlertCircleIcon} from "lucide-react";

interface ErrorBoundaryProps {
	error: Error & {digest?: string};
	reset(): void;
}

export default function ErrorBoundary({error}: ErrorBoundaryProps) {
	return (
		<Box>
			<Alert>
				<AlertIcon>
					<AlertCircleIcon />
				</AlertIcon>

				<AlertTitle>{error.name}</AlertTitle>
				<AlertDescription>{error.message}</AlertDescription>
			</Alert>
		</Box>
	);
}
