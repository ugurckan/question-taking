import { createSelector } from '@ngrx/store';

// Reducers
import * as fromFeature from '../reducers';
import { getQuestions, getQuestionLoading } from '../reducers/quiz.reducer';

export const getQuiz = createSelector(
  fromFeature.getQuizState,
  (state: fromFeature.QuizState) => state.quiz
);

export const getQuizData = createSelector(getQuiz, getQuestions);
export const getQuizLoading = createSelector(getQuiz, getQuestionLoading);
