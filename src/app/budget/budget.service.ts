import { Injectable } from '@angular/core';

import { IExpenseItem, IIncomeItem } from '../models/interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  expenseList: IExpenseItem[] = [
    { id: 1, date: new Date('4/1/2020'), category: 'rent', amount: 1000.47 },
    { id: 2, date: new Date('4/10/2020'), category: 'phone', amount: 70.74 },
    { id: 3, date: new Date('4/15/2020'), category: 'car', amount: 289.23 },
    { id: 4, date: new Date('4/1/2020'), category: 'internet', amount: 81.95 }
  ];

  incomeList: IIncomeItem[] = [
    { id: 1, date: new Date('4/1/2020'), source: 'paycheck', amount: 1500 },
    { id: 2, date: new Date('4/15/2020'), source: 'paycheck', amount: 1500 }
  ];

  constructor() { }

  getExpenseItems(): Observable<IExpenseItem[]> {
    return of(this.expenseList);
  }

  getIncomeItems(): Observable<IIncomeItem[]> {
    return of(this.incomeList);
  }
}
