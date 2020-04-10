import { Component, Input, OnInit } from '@angular/core';

import { IDay, IBudgetItem } from '../../models/interfaces';

@Component({
  selector: 'app-budget-calendar',
  templateUrl: './budget-calendar.component.html',
  styleUrls: ['./budget-calendar.component.scss']
})
export class BudgetCalendarComponent implements OnInit {
  @Input()
  incomeList: IBudgetItem[];

  @Input()
  expenseList: IBudgetItem[];

  @Input()
  startingBalance: number = 0;

  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  monthYearDisplay = `${this.months[this.currentMonth]} ${this.currentYear}`;

  calendarWeeks: IDay[][] = [];

  constructor() { }

  ngOnInit(): void {
    this.createCalendarWeeks();
  }

  addExpenseToCalendar(expense: IBudgetItem): void {
    const expenseDate = expense.date.getDate();

    this.calendarWeeks.forEach(week => {
      week.forEach(d => {
        if (d && (d.day === expenseDate)) {
          d.dailyExpenses.push(expense);
        }
      });
    });

    this.updateDailyTotals();
  }

  addIncomeToCalendar(income: IBudgetItem): void {
    const incomeDate = income.date.getDate();

    this.calendarWeeks.forEach(week => {
      week.forEach(d => {
        if (d && (d.day === incomeDate)) {
          d.dailyIncome.push(income);
        }
      });
    });

    this.updateDailyTotals();
  }

  createCalendarWeeks(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth).getDay();
    const daysInMonth = 32 - new Date(this.currentYear, this.currentMonth, 32).getDate();
    let day = 0;

    const firstWeekData = this.createFirstWeek(firstDay);
    this.calendarWeeks.push(firstWeekData.week);
    day = firstWeekData.day;

    for (let j = 0; j < 4; j++) {
      if (day >= daysInMonth) {
        break;
      }
      const weekData = this.createSubsiquentWeek(day, daysInMonth);
      this.calendarWeeks.push(weekData.week);
      day = weekData.day;
    }

    this.expenseList.forEach(item => {
      this.addExpenseToCalendar(item);
    });

    this.incomeList.forEach(item => {
      this.addIncomeToCalendar(item);
    });
  }

  createFirstWeek(firstDay: number): any {
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

  createSubsiquentWeek(firstDay: number, lastDay: number): any {
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

  removeExpenseFromCalendar(expense: IBudgetItem): void {
    const expenseDate = expense.date.getDate();

    this.calendarWeeks.forEach(week => {
      week.forEach(d => {
        if (d && (d.day === expenseDate)) {
          const index = d.dailyExpenses.findIndex((exp) => exp === expense);
          d.dailyExpenses.splice(index, 1);
        }
      });
    });

    this.updateDailyTotals();
  }

  removeIncomeFromCalendar(income: IBudgetItem): void {
    const incomeDate = income.date.getDate();

    this.calendarWeeks.forEach(week => {
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

    if (this.startingBalance && this.startingBalance > 0) {
      total = this.startingBalance
    }

    this.calendarWeeks.forEach(w => {
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
}
