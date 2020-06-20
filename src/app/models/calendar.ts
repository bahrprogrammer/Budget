import { IBudgetItem, IDay } from './interfaces';

export class Calendar {
  month: any;
  year: any;
  currentMonth: boolean;
  currentMonthInWeeks: IDay[][] = [];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  currentMonthDisplay = '';
  startingBalance = 0;

  expenseList: IBudgetItem[] = [];
  incomeList: IBudgetItem[] = [];
  expenseTotal: number;
  incomeTotal: number;

  get remainder(): number {
    const starting = this.startingBalance;
    return this.incomeTotal + starting - this.expenseTotal;
  }

  constructor(date: Date) {
    this.createCalendarWeeks(date);
    this.updateExpenseTotal();
    this.updateIncomeTotal();
  }

  addExpenseToCalendar(expense: IBudgetItem): void {
    if (typeof(expense.date) === 'string') {
      const date = new Date(expense.date);
      date.setDate(date.getDate() + 1);
      expense.date = date;
    }

    this.expenseList.push(expense);
    this.expenseList.sort((a, b) => (a.date > b.date) ? 1 : -1);

    const expenseDate = expense.date.getDate();

    this.currentMonthInWeeks.forEach(week => {
      week.forEach(d => {
        if (d && (d.day === expenseDate)) {
          d.dailyExpenses.push(expense);
        }
      });
    });

    this.updateDailyTotals();
    this.updateExpenseTotal();
  }

  addIncomeToCalendar(income: IBudgetItem): void {
    if (typeof(income.date) === 'string') {
      const date = new Date(income.date);
      date.setDate(date.getDate() + 1);
      income.date = date;
    }

    this.incomeList.push(income);
    this.incomeList.sort((a, b) => (a.date > b.date) ? 1 : -1);

    const incomeDate = income.date.getDate();

    this.currentMonthInWeeks.forEach(week => {
      week.forEach(d => {
        if (d && (d.day === incomeDate)) {
          d.dailyIncome.push(income);
        }
      });
    });

    this.updateDailyTotals();
    this.updateIncomeTotal();
  }

  private createCalendarWeeks(date: Date): void {
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.currentMonthDisplay = `${this.months[this.month]} ${this.year}`;

    const firstDay = new Date(this.year, this.month).getDay();
    const daysInMonth = 32 - new Date(this.year, this.month, 32).getDate();
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

  removeExpenseFromCalendar(expense: IBudgetItem): void {
    const index = this.expenseList.indexOf(expense);
    this.expenseList.splice(index, 1);

    const expenseDate = expense.date.getDate();

    this.currentMonthInWeeks.forEach(week => {
      week.forEach(d => {
        if (d && (d.day === expenseDate)) {
          // tslint:disable-next-line: no-shadowed-variable
          const index = d.dailyExpenses.findIndex((exp) => exp === expense);
          d.dailyExpenses.splice(index, 1);
        }
      });
    });

    this.updateDailyTotals();
    this.updateExpenseTotal();
  }

  removeIncomeFromCalendar(income: IBudgetItem): void {
    const index = this.incomeList.indexOf(income);
    this.incomeList.splice(index, 1);

    const incomeDate = income.date.getDate();

    this.currentMonthInWeeks.forEach(week => {
      week.forEach(d => {
        if (d && (d.day === incomeDate)) {
          // tslint:disable-next-line: no-shadowed-variable
          const index = d.dailyIncome.findIndex((inc) => inc === income);
          d.dailyIncome.splice(index, 1);
        }
      });
    });

    this.updateDailyTotals();
    this.updateIncomeTotal();
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

  updateExpenseTotal(): void {
    let total = 0;
    for (const exp of this.expenseList) {
      total += exp.amount;
    }
    this.expenseTotal = total;
  }

  updateIncomeTotal(): void {
    let total = 0;
    for (const inc of this.incomeList) {
      total += inc.amount;
    }
    this.incomeTotal = total;
  }
}

