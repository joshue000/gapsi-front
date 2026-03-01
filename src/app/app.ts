import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';
import { ConstantsService } from './core/services/constants.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  showHeader: boolean = false;

  constructor(
    private router: Router,
    private constants: ConstantsService
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith({ url: this.router.url } as NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showHeader = event.url !== this.constants.routes.splash;
    });
  }
}
