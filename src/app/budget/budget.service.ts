import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { LOCAL_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';

import { Calendar } from '../models/calendar';
import { IBudgetItem } from '../models/interfaces';

const STORAGE_KEY = 'budget-calendar';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  storage = window.localStorage;
  currentMonth: Calendar;
  nextMonth: Calendar;

  expenseList: IBudgetItem[] = [];

  incomeList: IBudgetItem[] = [];

  // @Inject(LOCAL_STORAGE) private storage: StorageService
  constructor() {
    const date: Date = new Date();
    this.currentMonth = this.createCalendar(date);
    this.currentMonth.currentMonth = true;

    date.setMonth((date.getMonth() + 1));
    this.nextMonth = this.createCalendar(date);
    this.nextMonth.currentMonth = false;

    this.updateStartingBalance(0);

    this.getLocalStorage();

    // this.storage.clear();
  }

  addToLocalStorage() {
    const budgetMonths: any = {
      currentMonth: {
        month: this.currentMonth.month,
        income: this.currentMonth.incomeList,
        expenses: this.currentMonth.expenseList
      },
      nextMonth: {
        month: this.nextMonth.month,
        income: this.nextMonth.incomeList,
        expenses: this.nextMonth.expenseList
      }
    };

    console.log('set:');
    console.log(budgetMonths);

    this.storage.setItem(STORAGE_KEY, JSON.stringify(budgetMonths));
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

  private clone(cloneObj: any): Calendar {
    const date = new Date(`${cloneObj.month + 1}/1/${cloneObj.year}`);
    const newCalendarMonth = new Calendar(date);

    if (cloneObj.expenseList.length > 0) {
      cloneObj.expenseList.forEach(e => {
        newCalendarMonth.addExpenseToCalendar(e);
      });
      newCalendarMonth.updateExpenseTotal();
    }

    if (cloneObj.incomeList.length > 0) {
      cloneObj.incomeList.forEach(i => {
        newCalendarMonth.addIncomeToCalendar(i);
      });
      newCalendarMonth.updateIncomeTotal();
    }

    newCalendarMonth.updateDailyTotals();
    return newCalendarMonth;
  }

  private getLocalStorage() {
    const cache = this.storage.getItem(STORAGE_KEY);

    console.log('get:');
    console.log(cache);

    if (cache) {
      const budgetMonths: any = JSON.parse(this.storage.getItem(STORAGE_KEY));
      if (this.currentMonth.month === budgetMonths.nextMonth.month) {
        if (budgetMonths.nextMonth.expenses.length > 0) {
          budgetMonths.nextMonth.expenses.forEach((element: IBudgetItem) => {
            this.currentMonth.addIncomeToCalendar(element);
          });
        }
        if (budgetMonths.nextMonth.income.length > 0) {
          budgetMonths.nextMonth.income.forEach((element: IBudgetItem) => {
            this.currentMonth.addIncomeToCalendar(element);
          });
        }
      } else if (this.currentMonth.month === budgetMonths.currentMonth.month) {
        if (budgetMonths.currentMonth.expenses.length > 0) {
          budgetMonths.currentMonth.expenses.forEach((element: IBudgetItem) => {
            this.currentMonth.addIncomeToCalendar(element);
          });
        }
        if (budgetMonths.currentMonth.income.length > 0) {
          budgetMonths.currentMonth.income.forEach((element: IBudgetItem) => {
            this.currentMonth.addIncomeToCalendar(element);
          });
        }
        if (budgetMonths.nextMonth.expenses.length > 0) {
          budgetMonths.nextMonth.expenses.forEach((element: IBudgetItem) => {
            this.nextMonth.addIncomeToCalendar(element);
          });
        }
        if (budgetMonths.nextMonth.income.length > 0) {
          budgetMonths.nextMonth.income.forEach((element: IBudgetItem) => {
            this.nextMonth.addIncomeToCalendar(element);
          });
        }
      }

      this.currentMonth.currentMonth = true;
      this.nextMonth.currentMonth = false;
    }
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
