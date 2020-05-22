import { BudgetService } from './budget.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { IBudgetItem, IDay } from '../models/interfaces';
import { BudgetHeaderComponent } from './budget-header/budget-header.component';
import { Calendar } from '../models/calendar';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  @ViewChild(BudgetHeaderComponent)
  private header: BudgetHeaderComponent;

  activeMonth: Calendar;

  constructor(private service: BudgetService) { }

  ngOnInit() {
    this.getCurrentMonth();
  }

  add(item: IBudgetItem, list: string) {
    if (list === 'expenses') {
      this.activeMonth.addExpenseToCalendar(item);
    } else if (list === 'income') {
      this.activeMonth.addIncomeToCalendar(item);
    }
    this.getCurrentMonth();
    this.header.updateChart();
  }

  removeItem(item: IBudgetItem, list: string) {
    if (list === 'expenses') {
      this.activeMonth.removeExpenseFromCalendar(item);
    } else if (list === 'income') {
      this.activeMonth.removeIncomeFromCalendar(item);
    }
    this.header.updateChart();
  }

  getCurrentMonth() {
    this.service.getCurrentCalendarMonth().subscribe({
      next: (data) => (this.activeMonth = data)
    });
  }

  getNextMonth() {
    this.service.getNextCalendarMonth().subscribe({
      next: (data) => (this.activeMonth = data)
    });
  }

  switchMonthView(month: string) {
    if (month === 'next') {
      this.getNextMonth();
    } else if (month === 'previous') {
      this.getCurrentMonth();
    }
  }

  updateStartingBalance(startingBalance: number) {
    this.service.updateStartingBalance(startingBalance);
  }
}
