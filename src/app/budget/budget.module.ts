import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { BudgetComponent } from './budget.component';

const budgetRoutes: Routes = [
  { path: 'budget', component: BudgetComponent }
];

@NgModule({
  declarations: [BudgetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(budgetRoutes)
  ]
})
export class BudgetModule { }
