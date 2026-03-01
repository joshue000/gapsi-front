import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  getWidth(): number {
    return window.innerWidth;
  }

  getWidth$(): Observable<number> {
    return fromEvent(window, 'resize').pipe(
      debounceTime(200),
      startWith(null),
      map(() => window.innerWidth),
      distinctUntilChanged()
    );
  }

  isMobile(breakpoint: number = 768): boolean {
    return this.getWidth() < breakpoint;
  }
}
