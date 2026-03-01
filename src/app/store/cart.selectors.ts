import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';
import { selectProductState } from './product.selectors';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartCount = createSelector(
  selectCartState,
  (state) => state.productSkus.length
);

export const selectCartProductSkus = createSelector(
  selectCartState,
  (state) => state.productSkus
);

export const selectCartTotal = createSelector(
  selectCartState,
  selectProductState,
  (cartState, productState) => {
    const cartSkus = cartState.productSkus;
    const allProducts = productState.allProducts;
    return cartSkus.reduce((total, sku) => {
      const product = allProducts.find(p => p.sku === sku);
      return total + (product?.price || 0);
    }, 0);
  }
);
