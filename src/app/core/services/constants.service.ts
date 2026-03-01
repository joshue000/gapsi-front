import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface AppConfig {
  header: { title: string };
  routes: { splash: string; welcome: string; productos: string };
  dragIcon: {
    iconClass: string;
    fontSize: string;
    color: string;
    offsetTop: string;
    imageOffsetX: number;
    imageOffsetY: number;
  };
  timing: { splashDelay: number; dragIconCleanup: number };
}

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  private config: AppConfig = {
    header: { title: 'e-Commerce Gapsi' },
    routes: { splash: '/', welcome: '/welcome', productos: '/productos' },
    dragIcon: {
      iconClass: 'fas fa-shopping-cart',
      fontSize: '48px',
      color: '#3b82f6',
      offsetTop: '-1000px',
      imageOffsetX: 24,
      imageOffsetY: 24
    },
    timing: { splashDelay: 2000, dragIconCleanup: 0 }
  };

  get headerTitle(): string {
    return this.config.header.title;
  }

  get routes() {
    return this.config.routes;
  }

  get dragIcon() {
    return this.config.dragIcon;
  }

  get timing() {
    return this.config.timing;
  }
}
