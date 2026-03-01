import { createAction, props } from '@ngrx/store';
import { Product } from '../core/services/product.service';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);

export const loadMoreProducts = createAction('[Products] Load More Products');

export const setPageSize = createAction(
  '[Products] Set Page Size',
  props<{ pageSize: number }>()
);
