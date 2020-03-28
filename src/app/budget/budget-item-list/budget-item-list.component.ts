import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBudgetItem } from '../../models/interfaces';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  addItem = new EventEmitter<IBudgetItem>();

  @Output()
  removeItem = new EventEmitter<IBudgetItem>();

  itemForm: FormGroup;

  newItem: IBudgetItem = {
    id: null,
    date: null,
    source: null,
    amount: null
  };

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.initializeFormGroup();
  }


  add(item: IBudgetItem) {
    this.addItem.emit(item);
  }

  remove(item: IBudgetItem) {
    this.removeItem.emit(item);
  }

  initializeFormGroup() {
    this.itemForm = this.builder.group({
      date: '',
      source: '',
      amount: ''
    });
  }
}
