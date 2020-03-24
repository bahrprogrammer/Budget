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

  addExpenseItem(item: IBudgetItem): Observable<IBudgetItem[]> {
    this.expenseList.push(item);

    return of(this.expenseList);
  }

  addIncomeItem(item: IBudgetItem): Observable<IBudgetItem[]> {
    this.incomeList.push(item);

    return of(this.incomeList);
  }

  getExpenseItems(): Observable<IBudgetItem[]> {
    return of(this.expenseList);
  }

  getIncomeItems(): Observable<IBudgetItem[]> {
    return of(this.incomeList);
  }
}
