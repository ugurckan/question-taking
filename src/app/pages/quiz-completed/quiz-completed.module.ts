import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

// Modules
import { SharedModule } from 'src/app/shared/modules/shared.module';

// Components
import { QuizCompletedComponent } from './quiz-completed.component';

const routes: Route[] = [
  {
    path: '',
    component: QuizCompletedComponent,
  },
];

@NgModule({
  declarations: [QuizCompletedComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class QuizCompletedModule {}
