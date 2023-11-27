"use client";

import {styled} from "@/styled-system/jsx";
import {select} from "@/styled-system/recipes";
import {createStyleContext} from "@/utils/create-style-context";
import {Select as parts} from "@ark-ui/react";

const {withProvider, withContext} = createStyleContext(select);

export const Select = withProvider(
	styled(
		parts.Root,
		{},
		{
			defaultProps: {
				loop: true,
				items: [],
				lazyMount: true,
				positioning: {
					sameWidth: true,
				},
			},
		},
	),
	"root",
);

export const SelectClearTrigger = withContext(
	styled(parts.ClearTrigger),
	"clearTrigger",
);
export const SelectContent = withContext(
	styled(parts.Content, {
		base: {
			shadow: "none",
			borderWidth: "1px",
		},
	}),
	"content",
);
export const SelectControl = withContext(styled(parts.Control), "control");
export const SelectItem = withContext(styled(parts.Item), "item");
export const SelectItemGroup = withContext(
	styled(parts.ItemGroup),
	"itemGroup",
);
export const SelectItemGroupLabel = withContext(
	styled(parts.ItemGroupLabel),
	"itemGroupLabel",
);
export const SelectItemIndicator = withContext(
	styled(parts.ItemIndicator),
	"itemIndicator",
);
export const SelectItemText = withContext(styled(parts.ItemText), "itemText");
export const SelectLabel = withContext(styled(parts.Label), "label");
export const SelectPositioner = withContext(
	styled(parts.Positioner),
	"positioner",
);
export const SelectTrigger = withContext(styled(parts.Trigger), "trigger");
export const SelectValueText = withContext(
	styled(parts.ValueText),
	"valueText",
);
