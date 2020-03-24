import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { BudgetComponent } from './budget.component';
import { BudgetItemListComponent } from './budget-item-list/budget-item-list.component';

const budgetRoutes: Routes = [
  { path: 'budget', component: BudgetComponent }
];

@NgModule({
  declarations: [BudgetComponent, BudgetItemListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(budgetRoutes)
  ]
})
export class BudgetModule { }
