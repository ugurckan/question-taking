import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

// Modules
import { SharedModule } from 'src/app/shared/modules/shared.module';

// Components
import { QuestionComponent } from './question.component';

const routes: Route[] = [
  {
    path: '',
    component: QuestionComponent,
  },
];

@NgModule({
  declarations: [QuestionComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [QuestionComponent],
})
export class QuestionModule {}
