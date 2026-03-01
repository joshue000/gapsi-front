import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../../core/services/constants.service';

@Component({
  selector: 'app-splash',
  standalone: false,
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  constructor(
    private router: Router,
    private constants: ConstantsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate([this.constants.routes.welcome]);
    }, this.constants.timing.splashDelay);
  }
}
