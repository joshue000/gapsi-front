import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material/button';

import { routes } from './app.routes';
import { App } from './app';
import { SharedModule } from './shared/shared.module';
import { visitorReducer } from './store/visitor.reducer';
import { productReducer } from './store/product.reducer';
import { cartReducer } from './store/cart.reducer';
import { VisitorEffects } from './store/visitor.effects';
import { ProductEffects } from './store/product.effects';
import { SplashComponent } from './pages/splash/splash.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProductosComponent } from './pages/productos/productos.component';

@NgModule({
  declarations: [
    App,
    SplashComponent,
    WelcomeComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SharedModule,
    StoreModule.forRoot({ 
      visitor: visitorReducer,
      products: productReducer,
      cart: cartReducer
    }),
    EffectsModule.forRoot([VisitorEffects, ProductEffects]),
    MatButtonModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [App]
})
export class AppModule { }
