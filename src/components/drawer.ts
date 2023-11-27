"use client";

import {styled} from "@/styled-system/jsx";
import {drawer} from "@/styled-system/recipes";
import {createStyleContext} from "@/utils/create-style-context";
import {ark, Dialog as parts} from "@ark-ui/react";

const {withProvider, withContext} = createStyleContext(drawer);

export const Drawer = withProvider(
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

export const DrawerBackdrop = withContext(styled(parts.Backdrop), "backdrop");
export const DrawerCloseTrigger = withContext(
	styled(parts.CloseTrigger),
	"closeTrigger",
);
export const DrawerPositioner = withContext(
	styled(parts.Positioner),
	"positioner",
);
export const DrawerContent = withContext(styled(parts.Content), "content");
export const DrawerDescription = withContext(
	styled(parts.Description),
	"description",
);
export const DrawerTitle = withContext(styled(parts.Title), "title");
export const DrawerTrigger = withContext(styled(parts.Trigger), "trigger");
export const DrawerHeader = withContext(styled(ark.div), "header");
export const DrawerBody = withContext(styled(ark.div), "body");
export const DrawerFooter = withContext(styled(ark.div), "footer");
