import { BudgetService } from './budget.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

import { IBudgetItem } from '../models/interfaces';
import { BudgetHeaderComponent } from './budget-header/budget-header.component';
import { Calendar } from '../models/calendar';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {
    console.log('on destroy');
    this.service.addToLocalStorage();
  }

  addExpense(formDirective: FormGroupDirective) {
    const item: IBudgetItem = this.expenseForm.value;

    this.activeMonth.addExpenseToCalendar(item);

    formDirective.resetForm();
    this.expenseForm.reset();

    this.service.addToLocalStorage();

    this.header.updateChart();
  }

  addIncome(formDirective: FormGroupDirective) {
    const item: IBudgetItem = this.incomeForm.value;

    this.activeMonth.addIncomeToCalendar(item);

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
