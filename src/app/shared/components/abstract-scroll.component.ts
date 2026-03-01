import { Directive, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive()
export abstract class AbstractScrollComponent implements AfterViewInit, OnDestroy {
  protected readonly SCROLL_THRESHOLD = 200;
  protected readonly LOAD_MORE_DELAY = 500;
  protected readonly SCROLL_DEBOUNCE_TIME = 100;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  protected scrollSubscription?: Subscription;
  protected isLoadingMore = false;
  private loadMoreTimeout?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    this.initializeScrollListener();
  }

  protected initializeScrollListener(): void {
    if (this.scrollContainer) {
      this.scrollSubscription = fromEvent(this.scrollContainer.nativeElement, 'scroll')
        .pipe(debounceTime(this.SCROLL_DEBOUNCE_TIME))
        .subscribe(() => this.handleScroll());
    }
  }

  protected handleScroll(): void {
    if (this.isLoadingMore || !this.canLoadMore()) return;
    
    const element = this.scrollContainer.nativeElement;
    
    if (this.isNearBottom(element)) {
      this.isLoadingMore = true;
      this.onLoadMore();
      this.loadMoreTimeout = setTimeout(() => this.isLoadingMore = false, this.LOAD_MORE_DELAY);
    }
  }

  protected isNearBottom(element: HTMLElement): boolean {
    const scrollPosition = element.scrollTop + element.clientHeight;
    const scrollHeight = element.scrollHeight;
    return scrollPosition >= scrollHeight - this.SCROLL_THRESHOLD;
  }

  protected abstract canLoadMore(): boolean;
  protected abstract onLoadMore(): void;

  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
    if (this.loadMoreTimeout) {
      clearTimeout(this.loadMoreTimeout);
    }
  }
}
