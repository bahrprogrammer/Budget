import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Calendar } from '../models/calendar';
import { IBudgetItem, IDay } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  currentMonth: Calendar;
  nextMonth: Calendar;

  expenseList: IBudgetItem[] = [
    { id: 1, date: new Date('5/1/2020'), source: 'rent', amount: 1000.47 },
    { id: 2, date: new Date('5/11/2020'), source: 'phone', amount: 70.74 },
    { id: 3, date: new Date('2020-05-24'), source: 'car', amount: 289.23 },
    { id: 4, date: new Date('5/1/2020'), source: 'internet', amount: 81.95 }
  ];

  incomeList: IBudgetItem[] = [
    { id: 1, date: new Date('5/1/2020'), source: 'paycheck', amount: 1500 },
    { id: 2, date: new Date('5/15/2020'), source: 'paycheck', amount: 1500 },
    { id: 1, date: new Date('6/1/2020'), source: 'paycheck', amount: 1500 },
    { id: 2, date: new Date('6/15/2020'), source: 'paycheck', amount: 1500 }
  ];

  constructor() {
    const date: Date = new Date();
    this.currentMonth = this.createCalendar(date);
    this.currentMonth.currentMonth = true;

    date.setMonth((date.getMonth() + 1));
    this.nextMonth = this.createCalendar(date);
    this.nextMonth.currentMonth = false;

    this.updateStartingBalance(0);
  }

  private createCalendar(date: Date): Calendar {
    const month = new Calendar(date);

    this.expenseList.forEach(item => {
      if (item.date.getMonth() === month.month) {
        month.addExpenseToCalendar(item);
      }
    });

    this.incomeList.forEach(item => {
      if (item.date.getMonth() === month.month) {
        month.addIncomeToCalendar(item);
      }
    });

    return month;
  }

  updateStartingBalance(startingBalance: number) {
    this.currentMonth.startingBalance = startingBalance;
    this.currentMonth.updateDailyTotals();
    this.nextMonth.startingBalance = this.currentMonth.remainder;
  }

  getCurrentCalendarMonth(): Observable<Calendar> {
    return of(this.currentMonth);
  }

  getNextCalendarMonth(): Observable<Calendar> {
    this.nextMonth.startingBalance = this.currentMonth.remainder;
    this.nextMonth.updateDailyTotals();
    return of(this.nextMonth);
  }
}
