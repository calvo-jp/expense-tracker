import {Skeleton} from "@/components/skeleton";
import {styled} from "@/styled-system/jsx";
import {ark} from "@ark-ui/react";

export const Card = styled(ark.div, {
	base: {
		p: 10,
		h: "10.5rem",
		minW: "18.5rem",
		rounded: "sm",
		display: "flex",
		alignItems: "center",
		gap: 6,
		flexShrink: 0,
		scrollSnapAlign: "start",
		scrollSnapStop: "always",
	},
});

export const CardIcon = styled(ark.div, {
	base: {
		w: 14,
		h: 14,
		bg: {
			base: "white.a1",
			_light: "black.a1",
		},
		rounded: "full",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
		"& svg": {
			w: 8,
			h: 8,
		},
	},
});

export const CardContent = styled(ark.div, {
	base: {},
});

export const CardLabel = styled(ark.div, {
	base: {
		color: {
			base: "white.a9",
			_light: "black.a9",
		},
		fontSize: "sm",
		fontFamily: "heading",
	},
});

export const CardHeading = styled(ark.div, {
	base: {
		fontFamily: "heading",
		fontSize: "4xl",
		fontWeight: "bold",
		truncate: true,
	},
});

export const CardSkeleton = () => (
	<Skeleton
		css={{
			h: "10.5rem",
			w: "18.5rem",
			rounded: "sm",
			flexGrow: 0,
			flexShrink: 0,
		}}
	/>
);
