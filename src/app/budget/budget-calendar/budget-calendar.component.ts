import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IDay, IBudgetItem } from '../../models/interfaces';
import { Calendar } from 'src/app/models/calendar';

@Component({
  selector: 'app-budget-calendar',
  templateUrl: './budget-calendar.component.html',
  styleUrls: ['./budget-calendar.component.scss']
})
export class BudgetCalendarComponent implements OnInit {
  @Input()
  calendar: Calendar;

  @Output()
  switchMonth = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  switchMonthView(month: string): void {
    this.switchMonth.emit(month);
  }
}
