'use client';

import {HTMLStyledProps, styled} from '@/styled-system/jsx';
import {Assign} from '@/styled-system/types';
import NextImage, {ImageProps} from 'next/image';
import {forwardRef, useEffect, useState} from 'react';

const StyledImage = styled(
	NextImage,
	{},
	{
		shouldForwardProp(key) {
			return [
				'src',
				'alt',
				'height',
				'width',
				'loader',
				'fill',
				'sizes',
				'quality',
				'priority',
				'placeholder',
				'style',
				'onLoadingComplete',
				'onLoad',
				'onError',
				'loading',
				'blurDataURL',
			].includes(key);
		},
	},
);

interface FallbackProps {
	fallbackSrc?: string;
}

export const Image = forwardRef<
	HTMLImageElement,
	Assign<HTMLStyledProps<'img'>, ImageProps> & FallbackProps
>(function Image({src, fill, onError, fallbackSrc, ...props}, ref) {
	const [error, setError] = useState(false);

	useEffect(() => {
		setError(false);
	}, [src]);

	return (
		<StyledImage
			ref={ref}
			src={!fallbackSrc ? src : error ? fallbackSrc : src}
			onError={(e) => {
				setError(true);
				onError?.(e);
			}}
			// @ts-expect-error
			fill={fill}
			{...props}
		/>
	);
});
