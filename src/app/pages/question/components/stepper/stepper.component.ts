import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';

// Models
import { Question, Answered } from 'src/app/models/question.model';

// Store
import * as fromRouterStore from '../../../../store';

@Component({
  selector: 'app-stepper',
  templateUrl: 'stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements OnInit {
  @Input() question: Question;
  @Input() questionLength: number;
  @Input() answereds: Answered[];

  steps: any[] = [];

  constructor(private _store: Store<fromRouterStore.State>) {}

  ngOnInit() {
    this.steps = Array.from({ length: this.questionLength }, (v) => v);
  }

  isCurrentQuestion(index: number): boolean {
    return this.question.id - 1 === index;
  }

  isCorrect(index: number): boolean {
    const answered = this.answereds[index];
    if (!answered) return false;
    return answered.answerIndex === answered.correctId;
  }

  onClickStepper(index: number) {
    this._store.dispatch(
      new fromRouterStore.Go({ path: [`quiz/question/${index}`] })
    );
  }
}
