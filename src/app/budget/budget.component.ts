import { BudgetService } from './budget.service';
import { Component, OnInit } from '@angular/core';

import { IExpenseItem, IIncomeItem } from '../models/interfaces';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  incomeList: IIncomeItem[] = [];
  expenseList: IExpenseItem[] = [];

  constructor(private service: BudgetService) { }

  ngOnInit() {
    this.getExpenseItems();
    this.getIncomeItems();
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
