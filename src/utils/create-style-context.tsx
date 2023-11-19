import {cx} from '@/styled-system/css';
import * as React from 'react';

type GenericProps = Record<string, unknown>;
type StyleRecipe = {
	(props?: GenericProps): Record<string, string>;
	splitVariantProps: (props: GenericProps) => any;
};
type StyleSlot<R extends StyleRecipe> = keyof ReturnType<R>;
type StyleSlotRecipe<R extends StyleRecipe> = Record<StyleSlot<R>, string>;
type StyleVariantProps<R extends StyleRecipe> = Parameters<R>[0];
type CombineProps<T, U> = Omit<T, keyof U> & U;

interface ComponentVariants<T extends React.ElementType, R extends StyleRecipe> {
	(props: CombineProps<React.ComponentProps<T>, StyleVariantProps<R>>): JSX.Element;
}

export const createStyleContext = <R extends StyleRecipe>(recipe: R) => {
	const StyleContext = React.createContext<StyleSlotRecipe<R> | null>(null);

	const withProvider = <T extends React.ElementType>(
		Component: T,
		slot?: StyleSlot<R>,
	): ComponentVariants<T, R> => {
		const StyledComponent = React.forwardRef((props: React.ComponentProps<T>, ref) => {
			const [variantProps, otherProps] = recipe.splitVariantProps(props);
			const slotStyles = recipe(variantProps) as StyleSlotRecipe<R>;

			return (
				<StyleContext.Provider value={slotStyles}>
					<Component
						ref={ref}
						{...otherProps}
						className={cx(slotStyles[slot ?? ''], otherProps.className)}
					/>
				</StyleContext.Provider>
			);
		});

		// @ts-expect-error
		StyledComponent.displayName = Component.displayname ?? Component.name ?? 'Component';

		return StyledComponent as unknown as ComponentVariants<T, R>;
	};

	const withContext = <T extends React.ElementType>(
		Component: T,
		slot?: StyleSlot<R>,
	): T => {
		if (!slot) return Component;

		const StyledComponent = React.forwardRef((props: React.ComponentProps<T>, ref) => {
			const slotStyles = React.useContext(StyleContext);

			return React.createElement(Component, {
				...props,
				className: cx(slotStyles?.[slot ?? ''], props.className),
				ref,
			});
		});

		// @ts-expect-error
		StyledComponent.displayName = Component.displayname ?? Component.name ?? 'Component';

		return StyledComponent as unknown as T;
	};

	return {
		withProvider,
		withContext,
	};
};
