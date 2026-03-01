import { Routes } from '@angular/router';
import { SplashComponent } from './pages/splash/splash.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProductosComponent } from './pages/productos/productos.component';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: '**', redirectTo: '' }
];
