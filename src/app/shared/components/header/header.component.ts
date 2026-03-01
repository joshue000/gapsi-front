import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearCart } from '../../../store/cart.actions';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public title: string = 'e-Commerce Gapsi';
  public showMenu: boolean = false;

  constructor(public router: Router, private store: Store) {}

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  reiniciar(): void {
    this.showMenu = false;
    this.store.dispatch(clearCart());
  }

  goHome(): void {
    this.showMenu = false;
    this.router.navigate(['/welcome']);
  }

  get isProductsPage(): boolean {
    return this.router.url === '/productos';
  }
}