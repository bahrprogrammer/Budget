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

  addItem(item: IBudgetItem, list: string) {
    if (list === 'expenses') {
      this.service.addExpenseItem(item).subscribe({
        next: (data) => (this.expenseList = data)
      });
    } else if (list === 'income') {
      this.service.addIncomeItem(item).subscribe({
        next: (data) => (this.expenseList = data)
      });
    }
  }

  removeItem(item: IBudgetItem, list: string) {
    console.log(item, list);
    if (list === 'expenses') {
      this.service.removeExpenseItem(item);
    } else if (list === 'income') {
      this.service.removeIncomeItem(item);
    }
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
