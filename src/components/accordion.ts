"use client";

import {styled} from "@/styled-system/jsx";
import {accordion} from "@/styled-system/recipes";
import {createStyleContext} from "@/utils/create-style-context";
import {Accordion as parts} from "@ark-ui/react";

const {withProvider, withContext} = createStyleContext(accordion);

export const Accordion = withProvider(styled(parts.Root), "root");
export const AccordionItem = withContext(styled(parts.Item), "item");
export const AccordionItemContent = withContext(
	styled(parts.ItemContent),
	"itemContent",
);
export const AccordionItemIndicator = withContext(
	styled(parts.ItemIndicator),
	"itemIndicator",
);
export const AccordionItemTrigger = withContext(
	styled(parts.ItemTrigger),
	"itemTrigger",
);
