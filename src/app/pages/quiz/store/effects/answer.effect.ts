import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';

// Services
import { AnswerService } from '../../services/answer.service';

// Store
import * as answerActions from '../actions/answer.action';

@Injectable()
export class AnswerEffects {
  constructor(
    private _router: Router,
    private actions$: Actions,
    private _answerService: AnswerService
  ) {}

  // TODO:
  checkAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(answerActions.CHECK_ANSWER),
      switchMap(() => {
        return this._answerService.check().pipe(
          map((data) => answerActions.checkAnswerSuccess({ isCorrect: true })),
          catchError((error) =>
            of(answerActions.checkAnswerFail({ isCorrect: false }))
          )
        );
      })
    )
  );

  successAnswer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(answerActions.CHECK_ANSWER_SUCCESS),
        tap((action: any) => {
          // TODO: next item
        })
      ),
    { dispatch: false }
  );

  failAnswer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(answerActions.CHECK_ANSWER_FAIL),
        tap((action: any) => {
          // TODO: error
        })
      ),
    { dispatch: false }
  );
}
