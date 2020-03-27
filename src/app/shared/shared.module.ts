import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatTooltipModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTooltipModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTooltipModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
