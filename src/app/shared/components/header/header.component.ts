import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearCart } from '../../../store/cart.actions';
import { ConstantsService } from '../../../core/services/constants.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public title: string = '';
  public showMenu: boolean = false;

  constructor(
    public router: Router,
    private store: Store,
    private constants: ConstantsService
  ) {}

  ngOnInit(): void {
    this.title = this.constants.headerTitle;
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

  get isProductsPage(): boolean {
    return this.router.url === this.constants.routes.productos;
  }
}