import { createReducer, on } from '@ngrx/store';

// Models
import { Question, Answered } from 'src/app/models/question.model';

// Store
import * as fromQuiz from '../actions/quiz.action';
import * as fromAnswer from '../actions/answer.action';

export interface QuizState {
  id: number | null;
  questions: Question[];
  answereds: Answered[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: QuizState = {
  id: null,
  questions: [],
  answereds: [],
  loaded: false,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(fromQuiz.loadQuiz, (state, payload) => {
    return {
      ...state,
      loading: true,
      id: payload.id,
    };
  }),
  on(fromQuiz.loadQuizFail, (state, payload) => {
    return {
      ...state,
      loading: false,
      loaded: false,
    };
  }),
  on(fromQuiz.loadQuizSuccess, (state, payload) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      questions: payload.questions,
    };
  }),
  on(fromAnswer.checkAnswer, (state, payload) => {
    // TODO:
    return {
      ...state,
      loading: true,
    };
  }),
  on(fromAnswer.checkAnswerFail, (state, payload) => {
    // TODO:
    return {
      ...state,
      loading: false,
      loaded: false,
    };
  }),
  on(fromAnswer.checkAnswerSuccess, (state, payload) => {
    // TODO:
    return {
      ...state,
      loading: false,
      loaded: true,
    };
  })
);

export const getQuestions = (state: QuizState): Question[] => state.questions;
export const getQuestionLoading = (state: QuizState): boolean => state.loading;
export const getQuestionLoaded = (state: QuizState): boolean => state.loaded;
