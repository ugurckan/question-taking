import { ComponentFixture, TestBed } from '@angular/core/testing';

// Modules (3rd party)
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

// Modules
import { QuestionModule } from '../../question.module';

// Components
import { StepperComponent } from './stepper.component';

// Models
import { Question, Answered } from 'src/app/models/question.model';

// Store
import * as fromRouterStore from '../../../../store';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;
  let store: MockStore<fromRouterStore.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        QuestionModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
      ],
      providers: [provideMockStore({ initialState: {} })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('initiation', () => {
    it('should have correct steps with given question length', () => {
      expect(component).toBeDefined();
      expect(component.steps.length).toEqual(0);

      const testLength = 5;
      component.questionLength = testLength;

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.steps.length).toEqual(testLength);
    });
  });

  describe('question', () => {
    it('should be current', () => {
      const testQuestionId = 4;
      const testQuestionIndex = testQuestionId - 1;
      component.question = { id: testQuestionId } as Question;
      expect(component.isCurrentQuestion(testQuestionIndex)).toBeTruthy();
    });

    it('should be correct & incorrect', () => {
      const testQuestionId = 1;
      const testQuestionIndex = testQuestionId - 1;
      component.question = { id: testQuestionId } as Question;
      component.answereds = [new Answered(testQuestionId, 3, 3)];
      expect(component.isCorrect(testQuestionIndex)).toBeTruthy();

      component.answereds = [new Answered(testQuestionId, 3, 2)];
      expect(component.isCorrect(testQuestionIndex)).toBeFalsy();
    });
  });

  describe('click stepper', () => {
    it('should redirect to selected question', () => {
      const spyDispatch = spyOn(store, 'dispatch');

      const testQuestionIndex = 2;
      component.onClickStepper(testQuestionIndex);

      expect(spyDispatch).toHaveBeenCalledTimes(1);
      expect(spyDispatch).toHaveBeenCalledWith(
        new fromRouterStore.Go({ path: [`quiz/question/${testQuestionIndex}`] })
      );
    });
  });
});
