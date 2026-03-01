import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../core/services/product.service';
import { selectAllProducts, selectProductsError, selectProductsLoading, selectHasMoreProducts } from '../../store/product.selectors';
import { selectCartProductSkus, selectCartCount, selectCartTotal } from '../../store/cart.selectors';

export interface ProductsComponentState {
  products: Product[];
  error: string | null;
  isLoading: boolean;
  hasMore: boolean;
  cartCount: number;
  cartTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsStateBuilder {
  constructor(private store: Store) {}

  build(): Observable<ProductsComponentState> {
    return combineLatest({
      products: combineLatest([
        this.store.select(selectAllProducts),
        this.store.select(selectCartProductSkus)
      ]).pipe(
        map(([products, cartSkus]) => 
          products.filter(p => !cartSkus.includes(p.sku))
        )
      ),
      error: this.store.select(selectProductsError),
      isLoading: this.store.select(selectProductsLoading),
      hasMore: this.store.select(selectHasMoreProducts),
      cartCount: this.store.select(selectCartCount),
      cartTotal: this.store.select(selectCartTotal)
    });
  }
}
