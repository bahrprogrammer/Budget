import { Calendar } from './calendar';
import { IBudgetItem, IDay } from './interfaces';

describe('Calendar', () => {
  let calendar: Calendar;
  const date = new Date('1/2/2020');

  beforeEach(() => {
    calendar = new Calendar(date);
  });

  it('should display Jan 2020', () => {
    expect(calendar.currentMonthDisplay).toBe('Jan 2020');
  });

  it('should have 5 weeks', () => {
    expect(calendar.currentMonthInWeeks.length).toEqual(5);
  });
});

describe('Calendar addExpenseToCalendar', () => {
  let calendar: Calendar;
  const date = new Date('1/2/2020');

  beforeEach(() => {
    calendar = new Calendar(date);
  });

  it('should add the item to the incomeList', () => {
    const expenseItem: IBudgetItem = {
      id: 1,
      date: new Date('1/5/2020'),
      source: 'test expense',
      amount: 500
    };

    calendar.addExpenseToCalendar(expenseItem);

    expect(calendar.expenseList.length).toEqual(1);
  });

  it('should add the amount to the incomeTotal', () => {
    const expenseItem: IBudgetItem = {
      id: 1,
      date: new Date('1/5/2020'),
      source: 'test expense',
      amount: 500
    };

    calendar.addExpenseToCalendar(expenseItem);

    expect(calendar.expenseTotal).toEqual(500);
  });
});

describe('Calendar addIncomeToCalendar', () => {
  let calendar: Calendar;
  const date = new Date('1/2/2020');

  beforeEach(() => {
    calendar = new Calendar(date);
  });

  it('should add the item to the incomeList', () => {
    const incomeItem: IBudgetItem = {
      id: 1,
      date: new Date('1/5/2020'),
      source: 'test income',
      amount: 500
    };

    calendar.addIncomeToCalendar(incomeItem);

    expect(calendar.incomeList.length).toEqual(1);
  });

  it('should add the amount to the incomeTotal', () => {
    const incomeItem: IBudgetItem = {
      id: 1,
      date: new Date('1/5/2020'),
      source: 'test income',
      amount: 500
    };

    calendar.addIncomeToCalendar(incomeItem);

    expect(calendar.incomeTotal).toEqual(500);
  });
});
