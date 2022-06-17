import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

// Services
import { QuizService } from '../../services/quiz.service';

// Store
import * as quizActions from '../actions/quiz.action';

@Injectable()
export class QuizEffects {
  constructor(private actions$: Actions, private _quizService: QuizService) {}

  loadQuiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quizActions.LOAD_QUIZ),
      switchMap(({ id }) => {
        return this._quizService.get().pipe(
          map(({ data }) => {
            const selectedQuiz = data.find((quiz) => quiz.id === id);
            if (!selectedQuiz) {
              return quizActions.loadQuizFail();
            }
            return quizActions.loadQuizSuccess(selectedQuiz);
          }),
          catchError(() => of(quizActions.loadQuizFail()))
        );
      })
    )
  );

  ngrxOnInitEffects(): Action {
    return quizActions.loadQuiz({ id: 1 });
  }
}
