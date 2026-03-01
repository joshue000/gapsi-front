import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectWelcome, selectVersion } from '../../store/visitor.selectors';
import { selectVisitorError } from '../../store/visitor.selectors';
import { loadVisitor } from '../../store/visitor.actions';
import { ConstantsService } from '../../core/services/constants.service';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  welcome$: Observable<string | null>;
  version$: Observable<string | null>;
  error$: Observable<string | null>;

  constructor(
    private store: Store,
    private router: Router,
    private constants: ConstantsService
  ) {
    this.welcome$ = this.store.select(selectWelcome);
    this.version$ = this.store.select(selectVersion);
    this.error$ = this.store.select(selectVisitorError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadVisitor());
  }

  onContinue(): void {
    this.router.navigate([this.constants.routes.productos]);
  }
}
