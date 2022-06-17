import { createAction, props } from '@ngrx/store';

// Models
import { Quiz } from 'src/app/models/quiz.model';

export const LOAD_QUIZ = '[Quiz] Load Quiz';
export const LOAD_QUIZ_FAIL = '[Quiz] Load Quiz Fail';
export const LOAD_QUIZ_SUCCESS = '[Quiz] Load Quiz Success';
export const RESET_QUIZ = '[Quiz] Reset Quiz';

export const loadQuiz = createAction(LOAD_QUIZ, props<{ id: number }>());
export const loadQuizFail = createAction(LOAD_QUIZ_FAIL);
export const loadQuizSuccess = createAction(LOAD_QUIZ_SUCCESS, props<Quiz>());
export const resetQuiz = createAction(RESET_QUIZ);
