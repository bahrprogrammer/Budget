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
