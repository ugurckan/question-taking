// Models
import { Question } from "./question.model";

export interface Quiz {
  id: number;
  questions: Question[]; // questions.length == 8
}
