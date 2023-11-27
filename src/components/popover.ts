"use client";

import {styled} from "@/styled-system/jsx";
import {popover} from "@/styled-system/recipes";
import {createStyleContext} from "@/utils/create-style-context";
import {Popover as parts} from "@ark-ui/react";

const {withProvider, withContext} = createStyleContext(popover);

export const Popover = withProvider(
	styled(
		parts.Root,
		{},
		{
			defaultProps: {
				lazyMount: true,
			},
		},
	),
);
export const PopoverAnchor = withContext(styled(parts.Anchor), "anchor");
export const PopoverArrow = withContext(styled(parts.Arrow), "arrow");
export const PopoverArrowTip = withContext(styled(parts.ArrowTip), "arrowTip");
export const PopoverCloseTrigger = withContext(
	styled(parts.CloseTrigger),
	"closeTrigger",
);
export const PopoverContent = withContext(
	styled(parts.Content, {
		base: {
			shadow: "none",
			borderWidth: "1px",
		},
	}),
	"content",
);
export const PopoverDescription = withContext(
	styled(parts.Description),
	"description",
);
export const PopoverPositioner = withContext(
	styled(parts.Positioner),
	"positioner",
);
export const PopoverTitle = withContext(styled(parts.Title), "title");
export const PopoverTrigger = withContext(styled(parts.Trigger), "trigger");
