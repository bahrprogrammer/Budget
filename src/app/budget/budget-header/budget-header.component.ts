import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-header',
  templateUrl: './budget-header.component.html',
  styleUrls: ['./budget-header.component.scss']
})
export class BudgetHeaderComponent implements OnInit {
  @Input()
  incomeTotal: number;

  @Input()
  expenseTotal: number;

  constructor() { }

  ngOnInit() {
  }

}
