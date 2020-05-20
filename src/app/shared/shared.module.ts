import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [],
  imports: [
    ChartsModule,
    CommonModule
  ],
  exports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
