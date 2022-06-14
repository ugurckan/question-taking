import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';

// Services
import { QuizService } from '../../services/quiz.service';

// Store
import * as quizActions from '../actions/quiz.action';

@Injectable()
export class QuizEffects {
  constructor(
    private _router: Router,
    private actions$: Actions,
    private _quizService: QuizService
  ) {}

  loadQuiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quizActions.LOAD_QUIZ),
      switchMap(() => {
        return this._quizService.get().pipe(
          map((data) => quizActions.loadQuizSuccess(data)),
          catchError((error) => of(quizActions.loadQuizFail(error)))
        );
      })
    )
  );

  successQuiz$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(quizActions.LOAD_QUIZ_SUCCESS),
        tap((action: any) => {
          // TODO: next item
        })
      ),
    { dispatch: false }
  );

  failQuiz$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(quizActions.LOAD_QUIZ_FAIL),
        tap((action: any) => {
          // TODO: error
        })
      ),
    { dispatch: false }
  );
}
