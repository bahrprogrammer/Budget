import { BudgetService } from './budget.service';
import { Component, OnInit } from '@angular/core';

import { IBudgetItem } from '../models/interfaces';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
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
    for (const exp of this.incomeList) {
      total += exp.amount;
    }
    return total;
  }

  constructor(private service: BudgetService) { }

  ngOnInit() {
    this.getExpenseItems();
    this.getIncomeItems();
  }

  addExpenseItem(item: IBudgetItem) {
    this.service.addExpenseItem(item).subscribe({
      next: (data) => (this.expenseList = data)
    });
  }

  addIncomeItem(item: IBudgetItem) {
    this.service.addIncomeItem(item).subscribe({
      next: (data) => (this.expenseList = data)
    });
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
