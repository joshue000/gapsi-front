import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Product } from '../../core/services/product.service';
import { loadProducts, loadMoreProducts, setPageSize } from '../../store/product.actions';
import { ProductsStateBuilder } from './products-state.builder';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly SCROLL_THRESHOLD = 200;
  private readonly LOAD_MORE_DELAY = 500;
  private readonly MOBILE_BREAKPOINT = 768;
  private readonly MOBILE_PAGE_SIZE = 4;
  private readonly DESKTOP_PAGE_SIZE = 8;

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
    
    if (scrollPosition >= scrollHeight - this.SCROLL_THRESHOLD) {
      this.isLoadingMore = true;
      this.store.dispatch(loadMoreProducts());
      setTimeout(() => this.isLoadingMore = false, this.LOAD_MORE_DELAY);
    }
  }

  onResize(): void {
    this.setInitialPageSize();
  }

  private setInitialPageSize(): void {
    const width = window.innerWidth;
    const pageSize = width < this.MOBILE_BREAKPOINT ? this.MOBILE_PAGE_SIZE : this.DESKTOP_PAGE_SIZE;
    this.store.dispatch(setPageSize({ pageSize }));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.scrollSubscription?.unsubscribe();
  }
}
