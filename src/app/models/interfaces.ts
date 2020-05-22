export interface IBudgetItem {
  id: number;
  date: Date;
  source: string;
  amount: number;
}

export interface IDay {
  day: number;
  dailyExpenses: IBudgetItem[];
  dailyIncome: IBudgetItem[];
  dailyTotal: number;
}
