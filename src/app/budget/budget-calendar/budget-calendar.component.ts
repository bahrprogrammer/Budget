import { Component, Input, OnInit } from '@angular/core';

import { IDay, IBudgetItem } from '../../models/interfaces';

@Component({
  selector: 'app-budget-calendar',
  templateUrl: './budget-calendar.component.html',
  styleUrls: ['./budget-calendar.component.scss']
})
export class BudgetCalendarComponent implements OnInit {
  @Input()
  calendarWeeks: IDay[][];

  @Input()
  monthYearDisplay = '';

  constructor() { }

  ngOnInit(): void { }
}
