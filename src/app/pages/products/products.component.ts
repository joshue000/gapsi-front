import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../core/services/product.service';
import { loadProducts, loadMoreProducts, setPageSize } from '../../store/product.actions';
import { ProductsStateBuilder, ProductsComponentState } from './products-state.builder';
import { AbstractScrollComponent } from '../../shared/components/abstract-scroll.component';
import { ViewportService } from '../../core/services/viewport.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent extends AbstractScrollComponent implements OnInit, OnDestroy {
  private readonly MOBILE_BREAKPOINT = 768;
  private readonly MOBILE_PAGE_SIZE = 4;
  private readonly DESKTOP_PAGE_SIZE = 8;

  state$!: Observable<ProductsComponentState>;
  private hasMore = false;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private stateBuilder: ProductsStateBuilder,
    private viewportService: ViewportService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setInitialPageSize();
    this.setupViewportListener();
    this.store.dispatch(loadProducts());
    this.state$ = this.stateBuilder.build();
    
    this.state$.pipe(takeUntil(this.destroy$)).subscribe(state => this.hasMore = state.hasMore);
  }

  private setupViewportListener(): void {
    this.viewportService.getWidth$().pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.setInitialPageSize());
  }

  protected canLoadMore(): boolean {
    return this.hasMore;
  }

  protected onLoadMore(): void {
    this.store.dispatch(loadMoreProducts());
  }

  private setInitialPageSize(): void {
    const isMobile = this.viewportService.isMobile(this.MOBILE_BREAKPOINT);
    const pageSize = isMobile ? this.MOBILE_PAGE_SIZE : this.DESKTOP_PAGE_SIZE;
    this.store.dispatch(setPageSize({ pageSize }));
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
