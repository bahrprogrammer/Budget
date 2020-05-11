import { BudgetService } from './budget.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { IBudgetItem, IDay } from '../models/interfaces';
import { BudgetHeaderComponent } from './budget-header/budget-header.component';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  @ViewChild(BudgetHeaderComponent)
  private header: BudgetHeaderComponent;

  incomeList: IBudgetItem[] = [];
  expenseList: IBudgetItem[] = [];
  currentMonth: IDay[][] = [];
  currentMonthDisplay = 'Current Month';

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
    this.getCurrentMonth();
    this.getCurrentMonthDisplay();
  }

  add(item: IBudgetItem, list: string) {
    if (list === 'expenses') {
      this.service.addExpenseItem(item);
    } else if (list === 'income') {
      this.service.addIncomeItem(item);
    }
    this.header.updateChart();
  }

  removeItem(item: IBudgetItem, list: string) {
    if (list === 'expenses') {
      this.service.removeExpenseItem(item);
    } else if (list === 'income') {
      this.service.removeIncomeItem(item);
    }
    this.header.updateChart();
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

  getCurrentMonth() {
    this.service.getCurrentCalendarMonth().subscribe({
      next: (data) => (this.currentMonth = data)
    });
  }

  getCurrentMonthDisplay() {
    this.service.getMonthDisplay().subscribe({
      next: (data) => (this.currentMonthDisplay = data)
    });
  }

  updateStartingBalance(startingBalance: number) {
    this.service.startingBalance = startingBalance;
    this.service.updateDailyTotals();
  }
}
