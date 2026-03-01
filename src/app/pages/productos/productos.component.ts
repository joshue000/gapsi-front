import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../core/services/product.service';
import { loadProducts } from '../../store/product.actions';
import { selectAllProducts, selectProductsError, selectProductsLoading } from '../../store/product.selectors';
import { selectCartProductSkus } from '../../store/cart.selectors';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  error: string | null = null;
  isLoading: boolean = false;
  private subscription?: Subscription;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    
    this.subscription = combineLatest([
      this.store.select(selectAllProducts),
      this.store.select(selectCartProductSkus)
    ]).pipe(
      map(([products, cartSkus]) => 
        products.filter(p => !cartSkus.includes(p.sku))
      )
    ).subscribe(products => {
      this.products = products;
      this.cdr.detectChanges();
    });
    
    this.store.select(selectProductsError).subscribe(error => {
      this.error = error;
      this.cdr.detectChanges();
    });
    
    this.store.select(selectProductsLoading).subscribe(loading => {
      this.isLoading = loading;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
