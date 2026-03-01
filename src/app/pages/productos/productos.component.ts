import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest, fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { Product } from '../../core/services/product.service';
import { loadProducts, loadMoreProducts, setPageSize } from '../../store/product.actions';
import { selectAllProducts, selectProductsError, selectProductsLoading, selectHasMoreProducts } from '../../store/product.selectors';
import { selectCartProductSkus, selectCartCount, selectCartTotal } from '../../store/cart.selectors';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  products: Product[] = [];
  error: string | null = null;
  isLoading: boolean = false;
  hasMore: boolean = false;
  cartCount: number = 0;
  cartTotal: number = 0;
  private subscription?: Subscription;
  private scrollSubscription?: Subscription;
  private isLoadingMore = false;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setInitialPageSize();
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
    
    this.store.select(selectHasMoreProducts).subscribe(hasMore => {
      this.hasMore = hasMore;
      this.cdr.detectChanges();
    });
    
    this.store.select(selectCartCount).subscribe(count => {
      this.cartCount = count;
      this.cdr.detectChanges();
    });
    
    this.store.select(selectCartTotal).subscribe(total => {
      this.cartTotal = total;
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    if (this.scrollContainer) {
      this.scrollSubscription = fromEvent(this.scrollContainer.nativeElement, 'scroll')
        .pipe(debounceTime(100))
        .subscribe(() => this.onScroll());
    }
  }

  onScroll(): void {
    if (this.isLoadingMore || !this.hasMore) return;
    
    const element = this.scrollContainer.nativeElement;
    const scrollPosition = element.scrollTop + element.clientHeight;
    const scrollHeight = element.scrollHeight;
    const threshold = 200;
    
    if (scrollPosition >= scrollHeight - threshold) {
      this.isLoadingMore = true;
      this.store.dispatch(loadMoreProducts());
      setTimeout(() => this.isLoadingMore = false, 500);
    }
  }

  onResize(): void {
    this.setInitialPageSize();
  }

  private setInitialPageSize(): void {
    const width = window.innerWidth;
    const pageSize = width < 768 ? 4 : 8;
    this.store.dispatch(setPageSize({ pageSize }));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.scrollSubscription?.unsubscribe();
  }
}
