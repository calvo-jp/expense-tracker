"use client";

import {styled} from "@/styled-system/jsx";
import {avatar} from "@/styled-system/recipes";
import {createStyleContext} from "@/utils/create-style-context";
import {Avatar as parts} from "@ark-ui/react";

const {withProvider, withContext} = createStyleContext(avatar);

export const Avatar = withProvider(
	styled(parts.Root, {
		base: {
			bg: "bg.subtle",
		},
	}),
	"root",
);

export const AvatarFallback = withContext(
	styled(parts.Fallback, {
		base: {
			bg: "transparent",
			border: "none",
			lineHeight: "none",
		},
	}),
	"fallback",
);

export const AvatarImage = withContext(styled(parts.Image), "image");
