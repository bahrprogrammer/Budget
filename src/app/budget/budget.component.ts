import { BudgetService } from './budget.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

import { IBudgetItem } from '../models/interfaces';
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
  incomeForm: FormGroup;
  expenseForm: FormGroup;

  constructor(private service: BudgetService, private builder: FormBuilder) { }

  ngOnInit() {
    this.initializeIncomeFormGroup();
    this.initializeExpenseFormGroup();
    this.getCurrentMonth();
  }

  addExpense(formDirective: FormGroupDirective) {
    const item: IBudgetItem = this.expenseForm.value;
    const success = this.service.addExpense(item);

    if (!success) {
      return;
    }

    formDirective.resetForm();
    this.expenseForm.reset();

    this.service.addToLocalStorage();

    this.header.updateChart();
  }

  addIncome(formDirective: FormGroupDirective) {
    const item: IBudgetItem = this.incomeForm.value;
    const success = this.service.addIncome(item);

    if (!success) {
      return;
    }

    formDirective.resetForm();
    this.incomeForm.reset();

    this.service.addToLocalStorage();

    this.header.updateChart();
  }

  removeItem(item: IBudgetItem, list: string) {
    if (list === 'expenses') {
      this.activeMonth.removeExpenseFromCalendar(item);
    } else if (list === 'income') {
      this.activeMonth.removeIncomeFromCalendar(item);
    }

    this.service.addToLocalStorage();

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

    this.header.expenseTotal = this.activeMonth.expenseTotal;
    this.header.incomeTotal = this.activeMonth.incomeTotal;
    this.header.updateChart();

    this.initializeExpenseFormGroup();
    this.initializeIncomeFormGroup();
  }

  updateStartingBalance(startingBalance: number) {
    this.service.updateStartingBalance(startingBalance);
  }

  initializeIncomeFormGroup() {
    this.incomeForm = this.builder.group({
      date: ['', Validators.required],
      source: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  initializeExpenseFormGroup() {
    this.expenseForm = this.builder.group({
      date: ['', Validators.required],
      source: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }
}
