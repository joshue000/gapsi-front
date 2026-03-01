import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Product } from '../core/services/product.service';

export interface ProductState {
  allProducts: Product[];
  displayedProducts: Product[];
  currentIndex: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  allProducts: [],
  displayedProducts: [],
  currentIndex: 0,
  pageSize: 8,
  loading: false,
  error: null
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => {
    const displayed = products.slice(0, state.pageSize);
    return {
      ...state,
      allProducts: products,
      displayedProducts: displayed,
      currentIndex: displayed.length,
      loading: false,
      error: null
    };
  }),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ProductActions.loadMoreProducts, (state) => {
    const nextIndex = state.currentIndex + state.pageSize;
    const newProducts = state.allProducts.slice(state.currentIndex, nextIndex);
    return {
      ...state,
      displayedProducts: [...state.displayedProducts, ...newProducts],
      currentIndex: Math.min(nextIndex, state.allProducts.length)
    };
  }),
  on(ProductActions.setPageSize, (state, { pageSize }) => {
    const displayed = state.allProducts.slice(0, pageSize);
    return {
      ...state,
      pageSize,
      displayedProducts: displayed,
      currentIndex: displayed.length
    };
  })
);
