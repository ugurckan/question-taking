import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

// Store
import { State } from '../../store/reducers';
import * as routerActions from '../../store/actions';

@Component({
  selector: 'app-quiz',
  templateUrl: 'quiz.component.html',
  styleUrls: [],
})
export class QuizComponent {
  constructor(private _store: Store<State>) {}

  onStartQuiz() {
    console.log('init');
    this._store.dispatch(new routerActions.Go({ path: ['quiz/exam/0'] }));
  }
}
