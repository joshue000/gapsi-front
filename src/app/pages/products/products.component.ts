import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../../core/services/product.service';
import { loadProducts, loadMoreProducts, setPageSize } from '../../store/product.actions';
import { ProductsStateBuilder } from './products-state.builder';
import { AbstractScrollComponent } from '../../shared/components/abstract-scroll.component';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends AbstractScrollComponent implements OnInit {
  private readonly MOBILE_BREAKPOINT = 768;
  private readonly MOBILE_PAGE_SIZE = 4;
  private readonly DESKTOP_PAGE_SIZE = 8;

  products: Product[] = [];
  error: string | null = null;
  isLoading: boolean = false;
  hasMore: boolean = false;
  cartCount: number = 0;
  cartTotal: number = 0;
  private subscription?: Subscription;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.setInitialPageSize();
    this.store.dispatch(loadProducts());
    
    const stateBuilder = new ProductsStateBuilder(this.store);
    this.subscription = stateBuilder.build().subscribe(state => {
      this.products = state.products;
      this.error = state.error;
      this.isLoading = state.isLoading;
      this.hasMore = state.hasMore;
      this.cartCount = state.cartCount;
      this.cartTotal = state.cartTotal;
      this.cdr.detectChanges();
    });
  }

  protected canLoadMore(): boolean {
    return this.hasMore;
  }

  protected onLoadMore(): void {
    this.store.dispatch(loadMoreProducts());
  }

  onResize(): void {
    this.setInitialPageSize();
  }

  private setInitialPageSize(): void {
    const width = window.innerWidth;
    const pageSize = width < this.MOBILE_BREAKPOINT ? this.MOBILE_PAGE_SIZE : this.DESKTOP_PAGE_SIZE;
    this.store.dispatch(setPageSize({ pageSize }));
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription?.unsubscribe();
  }
}
