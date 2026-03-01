import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartCount } from '../../../store/cart.selectors';
import { addToCart } from '../../../store/cart.actions';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartCount$: Observable<number>;

  constructor(private store: Store) {
    this.cartCount$ = this.store.select(selectCartCount);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const productSku = event.dataTransfer?.getData('productSku');
    if (productSku) {
      this.store.dispatch(addToCart({ productSku }));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
}
