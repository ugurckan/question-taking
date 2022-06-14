import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { LoadingSpinnnerModule } from '../loading-spinner/loading-spinner.module';

// Components
import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, LoadingSpinnnerModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}
