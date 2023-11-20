'use client';

import {styled} from '@/styled-system/jsx';
import {carousel} from '@/styled-system/recipes';
import {createStyleContext} from '@/utils/create-style-context';
import {Carousel as parts} from '@ark-ui/react';

const {withProvider, withContext} = createStyleContext(carousel);

export const Carousel = withProvider(styled(parts.Root), 'root');
export const CarouselControl = withContext(styled(parts.Control), 'control');
export const CarouselIndicator = withContext(styled(parts.Indicator), 'indicator');
export const CarouselIndicatorGroup = withContext(
	styled(parts.IndicatorGroup),
	'indicatorGroup',
);
export const CarouselItem = withContext(styled(parts.Item), 'item');
export const CarouselItemGroup = withContext(styled(parts.ItemGroup), 'itemGroup');
export const CarouselNextTrigger = withContext(styled(parts.NextTrigger), 'nextTrigger');
export const CarouselPrevTrigger = withContext(styled(parts.PrevTrigger), 'prevTrigger');
export const CarouselViewport = withContext(styled(parts.Viewport), 'viewport');
