import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBudgetItem } from '../../models/interfaces';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})
export class BudgetItemListComponent implements OnInit {
  @Input()
  items: IBudgetItem[];

  @Input()
  listTitle = 'budget';

  @Output()
  addItem = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.addItem.emit();
  }
}
