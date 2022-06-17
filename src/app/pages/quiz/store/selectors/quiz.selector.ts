import { createSelector } from '@ngrx/store';

// Reducers
import * as fromFeature from '../reducers';
import * as fromQuiz from '../reducers/quiz.reducer';

export const getQuiz = createSelector(
  fromFeature.getQuizState,
  (state: fromFeature.QuizState) => state.quiz
);

export const getQuizData = createSelector(getQuiz, fromQuiz.getQuestions);
export const getAnswereds = createSelector(getQuiz, fromQuiz.getAnswereds);

export const getQuestion = (id: number) =>
  createSelector(getQuizData, fromQuiz.getQuestion(id));
export const isAnswerCorrect = (id: number) =>
  createSelector(getAnswereds, fromQuiz.isAnswerCorrect(id));

export const getQuestionLoading = createSelector(
  getQuiz,
  fromQuiz.getQuestionLoading
);
export const getQuestionLoaded = createSelector(
  getQuiz,
  fromQuiz.getQuestionLoaded
);
export const getQuestionCount = createSelector(
  getQuiz,
  fromQuiz.getQuestionCount
);
