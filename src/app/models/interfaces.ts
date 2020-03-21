export interface IExpenseItem {
  id: number;
  date: Date;
  category: string;
  amount: number;
}

export interface IIncomeItem {
  id: number;
  date: Date;
  source: string;
  amount: number;
}

