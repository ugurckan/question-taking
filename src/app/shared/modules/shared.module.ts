import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { ButtonModule } from 'src/app/components/button/button.module';

@NgModule({
  imports: [ButtonModule],
  exports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
})
export class SharedModule {}
