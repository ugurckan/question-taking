import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromQuiz from './quiz.reducer';

export interface QuizState {
  quiz: fromQuiz.QuizState;
}

export const reducers: ActionReducerMap<QuizState> = {
  quiz: fromQuiz.reducer,
};

export const getQuizState = createFeatureSelector<QuizState>('quiz');
