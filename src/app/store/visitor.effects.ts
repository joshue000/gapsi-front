import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as VisitorActions from './visitor.actions';
import { VisitorService } from '../core/services/visitor.service';

@Injectable()
export class VisitorEffects {
  private actions$ = inject(Actions);
  private visitorService = inject(VisitorService);

  loadVisitor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VisitorActions.loadVisitor),
      switchMap(() =>
        this.visitorService.createVisitor().pipe(
          map(response => VisitorActions.loadVisitorSuccess({ data: response.data })),
          catchError(error => of(VisitorActions.loadVisitorFailure({ error: error.message })))
        )
      )
    )
  );
}
