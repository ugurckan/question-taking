import { Component } from '@angular/core';

// Modules (3rd party)
import { first } from 'rxjs';
import { select, Store } from '@ngrx/store';

// Store
import * as fromQuizStore from '../quiz/store';
import * as fromRouterStore from '../../store';

@Component({
  selector: 'app-quiz-completed',
  templateUrl: 'quiz-completed.component.html',
})
export class QuizCompletedComponent {
  correctCount: number = 0;
  wrongCount: number = 0;

  constructor(private _store: Store<fromQuizStore.QuizState>) {}

  ngOnInit() {
    this._store
      .pipe(select(fromQuizStore.getAnswereds), first())
      .subscribe((answereds) => {
        for (const answered of answereds) {
          if (answered.answerIndex === answered.correctId) {
            this.correctCount += 1;
          } else {
            this.wrongCount += 1;
          }
        }
      });
  }

  onClickReset() {
    this._store.dispatch(fromQuizStore.resetQuiz());
    this._store.dispatch(new fromRouterStore.Go({ path: ['quiz/question/1'] }));
  }
}
