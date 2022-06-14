import { createAction, props } from '@ngrx/store';

// Models
import { Answering } from 'src/app/models/question.model';

export const CHECK_ANSWER = '[Answer] Check Answer';
export const CHECK_ANSWER_FAIL = '[Answer] Check Answer Fail';
export const CHECK_ANSWER_SUCCESS = '[Answer] Check Answer Success';

export const checkAnswer = createAction(CHECK_ANSWER, props<Answering>());
export const checkAnswerFail = createAction(CHECK_ANSWER_FAIL, props<any>());
export const checkAnswerSuccess = createAction(
  CHECK_ANSWER_SUCCESS,
  props<{ isCorrect: boolean }>()
);
