import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Modules
import { SharedModule } from 'src/app/shared/modules/shared.module';

// Components
import { QuizComponent } from '../quiz/quiz.component';

// Services
import { QuizService } from './services/quiz.service';
import { AnswerService } from './services/answer.service';

// Store
import { reducers, effects } from '../quiz/store';

const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'start',
        pathMatch: 'full',
      },
      {
        path: 'start',
        component: QuizComponent,
      },
      {
        path: 'exam/:id',
        loadChildren: () =>
          import('../question/question.module').then((m) => m.QuestionModule),
      },
    ],
  },
];

@NgModule({
  declarations: [QuizComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('quiz', reducers),
    EffectsModule.forFeature(effects),
  ],
  exports: [QuizComponent],
  providers: [QuizService, AnswerService],
})
export class QuizModule {}
