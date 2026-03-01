import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { clearCart } from '../../../store/cart.actions';
import { ConstantsService } from '../../../core/services/constants.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = '';
  showMenu: boolean = false;
  isProductsPage: boolean = false;

  constructor(
    private router: Router,
    private store: Store,
    private constants: ConstantsService
  ) {}

  ngOnInit(): void {
    this.title = this.constants.headerTitle;
    this.updateProductsPageStatus();
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateProductsPageStatus();
    });
  }

  private updateProductsPageStatus(): void {
    this.isProductsPage = this.router.url === this.constants.routes.productos;
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  reiniciar(): void {
    this.showMenu = false;
    this.store.dispatch(clearCart());
  }

  goHome(): void {
    this.showMenu = false;
    this.router.navigate([this.constants.routes.welcome]);
  }
}