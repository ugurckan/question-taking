export interface Question {
  id: number;
  text: string; // e.g. “What is the capital of France?”
  answers: Answer[]; // answers.length=4, only one answer will be correct
}

export interface Answer {
  text: string; // e.g. “Paris”
  index: number; // a zero based index of answers to a question. The answer with index 0 is
  // correct.
}

// posted to the /answer endpoint when a user answers a question
export interface Answering {
  questionId: number;
  answerIndex: number; // answerIndex is in [0,1,2,3]
}

export interface Answered extends Answering {
  correctId: number;
}
