import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductCardComponent,
    ProductListComponent,
    ErrorMessageComponent,
    CartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    ProductCardComponent,
    ProductListComponent,
    ErrorMessageComponent,
    CartComponent,
    CommonModule
  ]
})
export class SharedModule {}