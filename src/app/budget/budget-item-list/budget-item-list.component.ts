import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBudgetItem } from '../../models/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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


  add() {
    const item: IBudgetItem = this.itemForm.value;
    this.addItem.emit(item);
    this.initializeFormGroup();
  }

  remove(item: IBudgetItem) {
    this.removeItem.emit(item);
  }

  initializeFormGroup() {
    this.itemForm = this.builder.group({
      date: '',
      source: ['', [Validators.required, Validators.minLength(3)]],
      amount: ['', [Validators.required, Validators.min(0)]],
    });
  }
}
