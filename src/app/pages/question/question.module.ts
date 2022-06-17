import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

// Modules
import { ModalModule } from 'src/app/components/modal/modal.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

// Components
import { QuestionComponent } from './question.component';
import { StepperComponent } from './components/stepper/stepper.component';

const routes: Route[] = [
  {
    path: '',
    component: QuestionComponent,
  },
];

@NgModule({
  declarations: [QuestionComponent, StepperComponent],
  imports: [SharedModule, ModalModule, RouterModule.forChild(routes)],
  exports: [QuestionComponent],
})
export class QuestionModule {}
