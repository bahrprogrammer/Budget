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

  expenseList: IBudgetItem[] = [];

  incomeList: IBudgetItem[] = [];

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
    return of(this.nextMonth);
  }
}
