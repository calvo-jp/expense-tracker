import {styled} from '@/styled-system/jsx';
import {switchRecipe} from '@/styled-system/recipes';
import {createStyleContext} from '@/utils/create-style-context';
import {Switch as parts} from '@ark-ui/react';

const {withProvider, withContext} = createStyleContext(switchRecipe);

export const Switch = withProvider(styled(parts.Root), 'root');
export const SwitchControl = withContext(styled(parts.Control), 'control');
export const SwitchLabel = withContext(styled(parts.Label), 'label');
export const SwitchThumb = withContext(styled(parts.Thumb), 'thumb');
