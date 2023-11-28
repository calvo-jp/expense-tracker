"use client";

import {styled} from "@/styled-system/jsx";
import {tooltip} from "@/styled-system/recipes";
import {createStyleContext} from "@/utils/create-style-context";
import {Tooltip as parts} from "@ark-ui/react";

const {withProvider, withContext} = createStyleContext(tooltip);

export const Tooltip = withProvider(
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
export const TooltipArrow = withContext(
	styled(parts.Arrow, {
		base: {
			"--arrow-size": "token(sizes.3)",
			"--arrow-background": "colors.fg.default",
		},
	}),
	"arrow",
);
export const TooltipArrowTip = withContext(styled(parts.ArrowTip), "arrowTip");
export const TooltipContent = withContext(styled(parts.Content), "content");
export const TooltipPositioner = withContext(
	styled(parts.Positioner),
	"positioner",
);
export const TooltipTrigger = withContext(styled(parts.Trigger), "trigger");
