import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Modules (3rd party)
import { select, Store } from '@ngrx/store';
import {
  map,
  pluck,
  EMPTY,
  first,
  filter,
  Subject,
  switchMap,
  takeUntil,
  Observable,
} from 'rxjs';

// Models
import { Answered, Question } from 'src/app/models/question.model';

// Store
import * as fromQuizStore from '../quiz/store';
import * as fromRouterStore from '../../store';

@Component({
  selector: 'app-question',
  templateUrl: 'question.component.html',
})
export class QuestionComponent implements OnInit {
  form: FormGroup;
  showModal = false;
  isCorrect = false;

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  private _question: Question;
  private _questionLength: number = 0;
  private _answereds: Answered[];

  get question(): Question {
    return this._question;
  }

  set question(value: Question) {
    this._question = value;
  }

  get questionLength(): number {
    return this._questionLength;
  }

  set questionLength(value: number) {
    this._questionLength = value;
  }

  get isLastQuestion(): boolean {
    return this.question.id === this._questionLength;
  }

  get answereds(): Answered[] {
    return this._answereds;
  }

  set answereds(value: Answered[]) {
    this._answereds = value;
  }

  private _destroy$: Subject<void>;

  constructor(
    private _store: Store<fromQuizStore.QuizState>,
    private _fb: FormBuilder,
    private _route: ActivatedRoute
  ) {
    this._destroy$ = new Subject<void>();
  }

  ngOnInit() {
    this._setQuestionLoaders();
    this._setQuestionLength();
    this._setAnswereds();
    this._initForm();

    this._route.params
      .pipe(
        takeUntil(this._destroy$),
        pluck('id'),
        map((id) => parseInt(id)),
        switchMap((id: number) => {
          if (!id) {
            return EMPTY;
          }

          return this._store.pipe(select(fromQuizStore.getQuestion(id)));
        })
      )
      .subscribe((res) => {
        if (res) {
          this.form.reset();
          this.question = res;
        }
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _setQuestionLoaders() {
    this.loading$ = this._store.select(fromQuizStore.getQuestionLoading);
    this.loaded$ = this._store.select(fromQuizStore.getQuestionLoaded);
  }

  private _setQuestionLength() {
    this._store
      .pipe(select(fromQuizStore.getQuestionCount), takeUntil(this._destroy$))
      .subscribe((length) => {
        this.questionLength = length;
      });
  }

  private _setAnswereds() {
    this._store
      .pipe(select(fromQuizStore.getAnswereds), takeUntil(this._destroy$))
      .subscribe((answereds) => {
        this.answereds = answereds;
      });
  }

  private _initForm() {
    this.form = this._fb.group({ answerIndex: [null, Validators.required] });
  }

  private _solve(answerIndex: string) {
    this._store.dispatch(
      fromQuizStore.checkAnswer({
        questionId: this.question.id,
        answerIndex: parseInt(answerIndex),
      })
    );
  }

  private _setAnswer() {
    this._store
      .pipe(
        select(fromQuizStore.getQuiz),
        filter((state) => !state.loading),
        map((state) => state.answereds),
        first()
      )
      .subscribe((answereds) => {
        const answered = answereds.find(
          (answered) => answered.questionId === this.question.id
        );

        if (answered?.correctId === undefined) {
          this._goToQuestion(this.question.id + 1);
        } else {
          this.isCorrect =
            answered?.correctId === parseInt(this.form.value.answerIndex);
          this.showModal = true;
        }
      });
  }

  onClickAnswer() {
    const { answerIndex } = this.form.value;
    this._solve(answerIndex);
    this._setAnswer();
  }

  private _goToQuestion(index: number) {
    this._store.dispatch(
      new fromRouterStore.Go({
        path: ['quiz/question', index],
      })
    );
  }

  onClickNext() {
    this.showModal = false;

    this._store
      .pipe(select(fromQuizStore.getQuiz), first())
      .subscribe((state) => {
        /** Answer the question which
            they’re viewing, but then go back to
            the errored question for a retry
        */
        const answeredWithError = state.answereds.filter(
          (answered) => answered.correctId === undefined
        )[0];
        if (answeredWithError) {
          this._goToQuestion(answeredWithError.questionId);
        } else {
          for (const question of state.questions) {
            const answeredQuestion = state.answereds.find(
              (answered) => answered.questionId === question.id
            );
            if (!answeredQuestion) {
              this._goToQuestion(question.id);
              break;
            }
          }
        }
      });
  }

  onClickFinish() {
    this._store.dispatch(new fromRouterStore.Go({ path: ['quiz/completed'] }));
  }
}
