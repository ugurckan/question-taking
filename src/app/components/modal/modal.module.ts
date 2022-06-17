import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { ButtonModule } from '../button/button.module';

// Components
import { ModalComponent } from './modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, ButtonModule],
  exports: [ModalComponent],
})
export class ModalModule {}
