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
  on(fromQuiz.resetQuiz, (state) => {
    return {
      ...state,
      answereds: [],
    };
  }),
  on(fromAnswer.checkAnswer, (state, payload) => {
    const answereds = [
      ...state.answereds,
      new Answered(payload.questionId, payload.answerIndex),
    ];

    return {
      ...state,
      loading: true,
      answereds: answereds,
    };
  }),
  on(fromAnswer.checkAnswerFail, (state) => {
    return {
      ...state,
      loading: false,
      loaded: true,
    };
  }),
  on(fromAnswer.checkAnswerSuccess, (state, payload) => {
    let answereds = state.answereds.filter(
      (answered) => answered.questionId !== payload.questionId
    );
    answereds = [
      ...answereds,
      new Answered(payload.questionId, payload.answerIndex, payload.correctId),
    ];

    return {
      ...state,
      loading: false,
      loaded: true,
      answereds: answereds,
    };
  })
);

export const getQuestions = (state: QuizState): Question[] => state.questions;
export const getAnswereds = (state: QuizState): Answered[] => state.answereds;
export const getQuestionLoading = (state: QuizState): boolean => state.loading;
export const getQuestionLoaded = (state: QuizState): boolean => state.loaded;
export const getQuestionCount = (state: QuizState): number =>
  state.questions.length;
export const getQuestion = (id: number) => (questions: Question[]) => {
  return questions.find((question) => question.id === id);
};
export const isAnswerCorrect = (id: number) => (answereds: Answered[]) => {
  const question = answereds.find((answered) => answered.questionId === id);
  return question;
};
