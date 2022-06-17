import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, switchMap, catchError, delay } from 'rxjs/operators';
import { Answered } from 'src/app/models/question.model';

// Services
import { AnswerService } from '../../services/answer.service';

// Store
import * as answerActions from '../actions/answer.action';

@Injectable()
export class AnswerEffects {
  constructor(
    private actions$: Actions,
    private _answerService: AnswerService
  ) {}

  checkAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(answerActions.CHECK_ANSWER),
      switchMap(({ questionId, answerIndex }) => {
        return this._answerService.check().pipe(
          /** Delay for showcase purpose */
          delay(1000),
          map((res) => {
            const answer = res.data.find(
              (answer) => answer.questionId === questionId
            );
            if (!answer) {
              return answerActions.checkAnswerFail({ questionId, answerIndex });
            }

            return answerActions.checkAnswerSuccess(
              new Answered(questionId, answerIndex, answer.answerIndex)
            );
          }),
          catchError(() =>
            of(answerActions.checkAnswerFail({ questionId, answerIndex }))
          )
        );
      })
    )
  );
}
