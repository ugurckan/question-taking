import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

// Store
import * as fromRouterStore from '../../store';

@Component({
  selector: 'app-quiz',
  templateUrl: 'quiz.component.html',
})
export class QuizComponent {
  constructor(private _store: Store<fromRouterStore.State>) {}

  onStartQuiz() {
    this._store.dispatch(new fromRouterStore.Go({ path: ['quiz/question/1'] }));
  }
}
