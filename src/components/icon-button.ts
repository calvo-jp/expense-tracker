import {styled} from "@/styled-system/jsx";
import {iconButton} from "@/styled-system/recipes";
import {ark} from "@ark-ui/react";

export const IconButton = styled(ark.button, iconButton, {
	defaultProps: {
		type: "button",
	},
});
