import { Component, OnInit, Input } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

}
