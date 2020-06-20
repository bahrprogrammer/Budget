import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { LOCAL_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';

import { Calendar } from '../models/calendar';
import { IBudgetItem } from '../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  storage = window.localStorage;
  storageKey = 'budget-calendar';

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
  }

  addToLocalStorage() {
    const localStorageAvailable = this.storageAvailable('localStorage');

    if (localStorageAvailable) {
      const cachedMonths: any = {
        currentMonth: {
          month: this.currentMonth.month,
          income: this.cloneArray(this.currentMonth.incomeList),
          expenses: this.cloneArray(this.currentMonth.expenseList),
          startingBalance: this.currentMonth.startingBalance
        },
        nextMonth: {
          month: this.nextMonth.month,
          income: this.cloneArray(this.nextMonth.incomeList),
          expenses: this.cloneArray(this.nextMonth.expenseList),
          startingBalance: this.nextMonth.startingBalance
        }
      };

      this.storage.cachedMonths = JSON.stringify(cachedMonths);
    } else {
      console.log(localStorageAvailable);
    }

    console.log('set:');
    console.log(this.storage.cachedMonths);
  }

  private getLocalStorage() {
    const localStorageAvailable = this.storageAvailable('localStorage');

    window.alert('cache test');

    if (localStorageAvailable) {
      const cache = this.storage.cachedMonths;

      window.alert(cache);

      if (cache) {
        const cachedMonths: any = JSON.parse(cache);
        if (this.currentMonth.month === cachedMonths.nextMonth.month) {
          this.populateMonthFromCache(this.currentMonth, cachedMonths.nextMonth);

          this.currentMonth.startingBalance = cachedMonths.nextMonth.startingBalance;
        } else if (this.currentMonth.month === cachedMonths.currentMonth.month) {
          this.populateMonthFromCache(this.currentMonth, cachedMonths.currentMonth);
          this.populateMonthFromCache(this.nextMonth, cachedMonths.nextMonth);

          this.currentMonth.startingBalance = cachedMonths.currentMonth.startingBalance;
        }

        this.currentMonth.currentMonth = true;
        this.nextMonth.currentMonth = false;
      }
    } else {
      console.log(localStorageAvailable);
    }

    this.currentMonth.updateDailyTotals();
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

  private cloneArray(arrayToClone: IBudgetItem[]): any[] {
    const results = [];

    arrayToClone.forEach((element: IBudgetItem) => {
      const item = {
        id: element.id,
        amount: element.amount,
        date: element.date.toString(),
        source: element.source
      };
      results.push(item);
    });

    return results;
  }

  private populateMonthFromCache(month: Calendar, cache: any): void {
    if (cache.expenses.length > 0) {
      cache.expenses.forEach((element: IBudgetItem) => {
        const item: IBudgetItem = {
          id: element.id,
          amount: element.amount,
          date: new Date(element.date),
          source: element.source
        };
        month.addExpenseToCalendar(item);
      });
    }
    if (cache.income.length > 0) {
      cache.income.forEach((element: IBudgetItem) => {
        const item: IBudgetItem = {
          id: element.id,
          amount: element.amount,
          date: new Date(element.date),
          source: element.source
        };
        month.addIncomeToCalendar(item);
      });
    }
  }

  updateStartingBalance(startingBalance: number) {
    if (this.currentMonth.startingBalance !== startingBalance) {
      this.currentMonth.startingBalance = startingBalance;
      this.currentMonth.updateDailyTotals();
      this.nextMonth.startingBalance = this.currentMonth.remainder;

      this.addToLocalStorage();
    }
  }

  getCurrentCalendarMonth(): Observable<Calendar> {
    return of(this.currentMonth);
  }

  getNextCalendarMonth(): Observable<Calendar> {
    this.nextMonth.startingBalance = this.currentMonth.remainder;
    this.nextMonth.updateDailyTotals();

    return of(this.nextMonth);
  }

  storageAvailable(type: any): any {
    let storage;

    try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && (
        e.code === 22 ||
        e.code === 1014 ||
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        (storage && storage.length !== 0);
    }

    return true;
  }
}
