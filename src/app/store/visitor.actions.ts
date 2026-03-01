import { createAction, props } from '@ngrx/store';
import { VisitorResponse } from '../core/services/visitor.service';

export const loadVisitor = createAction('[Visitor] Load Visitor');

export const loadVisitorSuccess = createAction(
  '[Visitor] Load Visitor Success',
  props<{ data: VisitorResponse['data'] }>()
);

export const loadVisitorFailure = createAction(
  '[Visitor] Load Visitor Failure',
  props<{ error: string }>()
);
