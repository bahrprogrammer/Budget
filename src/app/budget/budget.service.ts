import { Injectable } from '@angular/core';

import { IBudgetItem, IDay } from '../models/interfaces';
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

  currentMonthInWeeks: IDay[][] = [];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  currentMonthDisplay = '';
  startingBalance = 0;

  constructor() {
    this.createCalendarWeeks();
  }

  private addExpenseToCalendar(expense: IBudgetItem): void {
    const expenseDate = expense.date.getDate();

    this.currentMonthInWeeks.forEach(week => {
      week.forEach(d => {
        if (d && (d.day === expenseDate)) {
          d.dailyExpenses.push(expense);
        }
      });
    });

    this.updateDailyTotals();
  }

  private addIncomeToCalendar(income: IBudgetItem): void {
    const incomeDate = income.date.getDate();

    this.currentMonthInWeeks.forEach(week => {
      week.forEach(d => {
        if (d && (d.day === incomeDate)) {
          d.dailyIncome.push(income);
        }
      });
    });

    this.updateDailyTotals();
  }

  private createCalendarWeeks(): void {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    this.currentMonthDisplay = `${this.months[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth).getDay();
    const daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
    let day = 0;

    const firstWeekData = this.createFirstWeek(firstDay);
    this.currentMonthInWeeks.push(firstWeekData.week);
    day = firstWeekData.day;

    for (let j = 0; j < 4; j++) {
      if (day >= daysInMonth) {
        break;
      }
      const weekData = this.createSubsiquentWeek(day, daysInMonth);
      this.currentMonthInWeeks.push(weekData.week);
      day = weekData.day;
    }

    this.expenseList.forEach(item => {
      this.addExpenseToCalendar(item);
    });

    this.incomeList.forEach(item => {
      this.addIncomeToCalendar(item);
    });
  }

  private createFirstWeek(firstDay: number): any {
    const week = [];
    let dayDate = 1;

    for (let i = 0; i < 7; i++) {
      let day: IDay;

      if (i < firstDay) {
        week.push(day);
      } else {
        day = {
          day: dayDate,
          dailyExpenses: [],
          dailyIncome: [],
          dailyTotal: 0
        };
        week.push(day);
        dayDate++;
      }
    }

    const result = {
      week,
      day: dayDate
    };

    return result;
  }

  private createSubsiquentWeek(firstDay: number, lastDay: number): any {
    const week = [];
    let dayDate = firstDay;

    for (let i = 0; i < 7; i++) {
       let day: IDay;

       if (dayDate <= lastDay) {
        day = {
          day: dayDate,
          dailyExpenses: [],
          dailyIncome: [],
          dailyTotal: 0
        };
        week.push(day);
        dayDate++;
       } else {
        week.push(day);
       }
     }

    const result = {
      week,
      day: dayDate
    };

    return result;
  }

  private removeExpenseFromCalendar(expense: IBudgetItem): void {
    const expenseDate = expense.date.getDate();

    this.currentMonthInWeeks.forEach(week => {
      week.forEach(d => {
        if (d && (d.day === expenseDate)) {
          const index = d.dailyExpenses.findIndex((exp) => exp === expense);
          d.dailyExpenses.splice(index, 1);
        }
      });
    });

    this.updateDailyTotals();
  }

  private removeIncomeFromCalendar(income: IBudgetItem): void {
    const incomeDate = income.date.getDate();

    this.currentMonthInWeeks.forEach(week => {
      week.forEach(d => {
        if (d && (d.day === incomeDate)) {
          const index = d.dailyIncome.findIndex((inc) => inc === income);
          d.dailyIncome.splice(index, 1);
        }
      });
    });

    this.updateDailyTotals();
  }

  updateDailyTotals(): void {
    let total = 0;

    if (this.startingBalance > 0) {
      total = this.startingBalance;
    }

    this.currentMonthInWeeks.forEach(w => {
      w.forEach(d => {
        if (d) {
          d.dailyIncome.forEach(i => {
            total += i.amount;
          });
          d.dailyExpenses.forEach(e => {
            total -= e.amount;
          });
          d.dailyTotal = total;
        }
      });
    });
  }

  addExpenseItem(item: IBudgetItem) {
    this.expenseList.push(item);
    this.expenseList.sort((a, b) => (a.date > b.date) ? 1 : -1);

    this.addExpenseToCalendar(item);
  }

  addIncomeItem(item: IBudgetItem) {
    this.incomeList.push(item);
    this.incomeList.sort((a, b) => (a.date > b.date) ? 1 : -1);

    this.addIncomeToCalendar(item);
  }

  removeExpenseItem(item: IBudgetItem) {
    const index = this.expenseList.indexOf(item);
    this.expenseList.splice(index, 1);

    this.removeExpenseFromCalendar(item);
  }

  removeIncomeItem(item: IBudgetItem) {
    const index = this.incomeList.indexOf(item);
    this.incomeList.splice(index, 1);

    this.removeIncomeFromCalendar(item);
  }

  getExpenseItems(): Observable<IBudgetItem[]> {
    this.expenseList.sort((a, b) => (a.date > b.date) ? 1 : -1);
    return of(this.expenseList);
  }

  getIncomeItems(): Observable<IBudgetItem[]> {
    this.incomeList.sort((a, b) => (a.date > b.date) ? 1 : -1);
    return of(this.incomeList);
  }

  getCurrentCalendarMonth(): Observable<IDay[][]> {
    return of(this.currentMonthInWeeks);
  }

  getMonthDisplay(): Observable<string> {
    return of(this.currentMonthDisplay);
  }
}
