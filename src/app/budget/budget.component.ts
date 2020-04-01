import { BudgetService } from './budget.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { IBudgetItem } from '../models/interfaces';
import { BudgetHeaderComponent } from './budget-header/budget-header.component';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  @ViewChild(BudgetHeaderComponent)
  private budgetHeaderComponent: BudgetHeaderComponent;

  incomeList: IBudgetItem[] = [];
  expenseList: IBudgetItem[] = [];

  get expenseTotal(): number {
    let total = 0;
    for (const exp of this.expenseList) {
      total += exp.amount;
    }
    return total;
  }

  get incomeTotal(): number {
    let total = 0;
    for (const inc of this.incomeList) {
      total += inc.amount;
    }
    return total;
  }

  constructor(private service: BudgetService) { }

  ngOnInit() {
    this.getExpenseItems();
    this.getIncomeItems();
  }

  add(item: IBudgetItem, list: string) {
    if (list === 'expenses') {
      this.service.addExpenseItem(item);
    } else if (list === 'income') {
      this.service.addIncomeItem(item);
    }
    this.budgetHeaderComponent.updateChart();
  }

  removeItem(item: IBudgetItem, list: string) {
    if (list === 'expenses') {
      this.service.removeExpenseItem(item);
    } else if (list === 'income') {
      this.service.removeIncomeItem(item);
    }
    this.budgetHeaderComponent.updateChart();
  }

  getExpenseItems() {
    this.service.getExpenseItems().subscribe({
      next: (data) => (this.expenseList = data)
    });
  }

  getIncomeItems() {
    this.service.getIncomeItems().subscribe({
      next: (data) => (this.incomeList = data)
    });
  }
}
