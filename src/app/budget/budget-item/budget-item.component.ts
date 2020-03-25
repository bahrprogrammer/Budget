import { Component, Input, OnInit } from '@angular/core';
import { IBudgetItem } from '../../models/interfaces';

@Component({
  selector: 'app-budget-item',
  templateUrl: './budget-item.component.html',
  styleUrls: ['./budget-item.component.scss']
})
export class BudgetItemComponent implements OnInit {
  @Input()
  item: IBudgetItem;

  constructor() { }

  ngOnInit() {
  }

}
