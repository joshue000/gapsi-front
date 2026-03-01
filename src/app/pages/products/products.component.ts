import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
export class ProductsComponent extends AbstractScrollComponent implements OnInit {
  private readonly MOBILE_BREAKPOINT = 768;
  private readonly MOBILE_PAGE_SIZE = 4;
  private readonly DESKTOP_PAGE_SIZE = 8;

  state$!: Observable<ProductsComponentState>;

  constructor(
    private store: Store,
    private stateBuilder: ProductsStateBuilder,
    private viewportService: ViewportService
  ) {
    super();
  }

  protected canLoadMore(): boolean {
    return this.hasMore;
  }

  private hasMore = false;

  ngOnInit(): void {
    this.setInitialPageSize();
    this.store.dispatch(loadProducts());
    this.state$ = this.stateBuilder.build();
    
    // Subscribe to hasMore for scroll logic
    this.state$.subscribe(state => this.hasMore = state.hasMore);
  }

  protected onLoadMore(): void {
    this.store.dispatch(loadMoreProducts());
  }

  onResize(): void {
    this.setInitialPageSize();
  }

  private setInitialPageSize(): void {
    const isMobile = this.viewportService.isMobile(this.MOBILE_BREAKPOINT);
    const pageSize = isMobile ? this.MOBILE_PAGE_SIZE : this.DESKTOP_PAGE_SIZE;
    this.store.dispatch(setPageSize({ pageSize }));
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
