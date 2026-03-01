import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';

export interface CartState {
  productSkus: string[];
}

export const initialState: CartState = {
  productSkus: []
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { productSku }) => ({
    ...state,
    productSkus: [...state.productSkus, productSku]
  })),
  on(CartActions.removeFromCart, (state, { productSku }) => ({
    ...state,
    productSkus: state.productSkus.filter(sku => sku !== productSku)
  })),
  on(CartActions.clearCart, () => initialState)
);
