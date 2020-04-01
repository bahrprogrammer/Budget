import { Injectable } from '@angular/core';

import { IBudgetItem } from '../models/interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  expenseList: IBudgetItem[] = [
    { id: 1, date: new Date('4/1/2020'), source: 'rent', amount: 1000.47 },
    { id: 2, date: new Date('4/10/2020'), source: 'phone', amount: 70.74 },
    { id: 3, date: new Date('4/15/2020'), source: 'car', amount: 289.23 },
    { id: 4, date: new Date('4/1/2020'), source: 'internet', amount: 81.95 }
  ];

  incomeList: IBudgetItem[] = [
    { id: 1, date: new Date('4/1/2020'), source: 'paycheck', amount: 1500 },
    { id: 2, date: new Date('4/15/2020'), source: 'paycheck', amount: 1500 }
  ];

  constructor() { }

  addExpenseItem(item: IBudgetItem) {
    this.expenseList.push(item);
    this.expenseList.sort((a, b) => (a.date > b.date) ? 1 : -1);
  }

  addIncomeItem(item: IBudgetItem) {
    this.incomeList.push(item);
    this.incomeList.sort((a, b) => (a.date > b.date) ? 1 : -1);
  }

  removeExpenseItem(item: IBudgetItem) {
    const index = this.expenseList.indexOf(item);
    this.expenseList.splice(index, 1);
  }

  removeIncomeItem(item: IBudgetItem) {
    const index = this.incomeList.indexOf(item);
    this.incomeList.splice(index, 1);
  }

  getExpenseItems(): Observable<IBudgetItem[]> {
    this.expenseList.sort((a, b) => (a.date > b.date) ? 1 : -1);
    return of(this.expenseList);
  }

  getIncomeItems(): Observable<IBudgetItem[]> {
    this.incomeList.sort((a, b) => (a.date > b.date) ? 1 : -1);
    return of(this.incomeList);
  }
}
