import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ productSku: string }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productSku: string }>()
);

export const clearCart = createAction('[Cart] Clear Cart');
