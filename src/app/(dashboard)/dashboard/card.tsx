import {styled} from "@/styled-system/jsx";
import {ark} from "@ark-ui/react";

export const Card = styled(ark.div, {
	base: {
		w: "18.5rem",
		h: "10.5rem",
		p: 10,
		rounded: "sm",
		display: "flex",
		alignItems: "center",
		gap: 6,
		flexShrink: 0,
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
	},
});

export const CardHeading = styled(ark.div, {
	base: {
		fontFamily: "heading",
		fontSize: "4xl",
		fontWeight: "bold",
		lineHeight: "none",
	},
});
