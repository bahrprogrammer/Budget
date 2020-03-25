import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetComponent } from './budget.component';
import { BudgetItemListComponent } from './budget-item-list/budget-item-list.component';
import { SharedModule } from '../shared/shared.module';
import { BudgetItemComponent } from './budget-item/budget-item.component';

const budgetRoutes: Routes = [
  { path: 'budget', component: BudgetComponent }
];

@NgModule({
  declarations: [BudgetComponent, BudgetItemListComponent, BudgetItemComponent],
  imports: [
    RouterModule.forChild(budgetRoutes),
    SharedModule
  ]
})
export class BudgetModule { }
