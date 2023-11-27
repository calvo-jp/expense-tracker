"use client";

import {styled} from "@/styled-system/jsx";
import {dialog} from "@/styled-system/recipes";
import {createStyleContext} from "@/utils/create-style-context";
import {Dialog as parts} from "@ark-ui/react";

const {withProvider, withContext} = createStyleContext(dialog);

export const Dialog = withProvider(
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

export const DialogBackdrop = withContext(styled(parts.Backdrop), "backdrop");
export const DialogCloseTrigger = withContext(
	styled(parts.CloseTrigger),
	"closeTrigger",
);
export const DialogContent = withContext(styled(parts.Content), "content");
export const DialogDescription = withContext(
	styled(parts.Description),
	"description",
);
export const DialogPositioner = withContext(
	styled(parts.Positioner),
	"positioner",
);
export const DialogTitle = withContext(styled(parts.Title), "title");
export const DialogTrigger = withContext(styled(parts.Trigger), "trigger");
