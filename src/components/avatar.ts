'use client';

import {styled} from '@/styled-system/jsx';
import {avatar} from '@/styled-system/recipes';
import {createStyleContext} from '@/utils/create-style-context';
import {Avatar as parts} from '@ark-ui/react';

const {withProvider, withContext} = createStyleContext(avatar);

export const Avatar = withProvider(styled(parts.Root), 'root');
export const AvatarFallback = withContext(styled(parts.Fallback), 'fallback');
export const AvatarImage = withContext(styled(parts.Image), 'image');
