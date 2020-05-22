import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBudgetItem } from '../../models/interfaces';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

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
    date: new Date(),
    source: null,
    amount: null
  };

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.initializeFormGroup();
  }


  add(formData: any, formDirective: FormGroupDirective) {
    const item: IBudgetItem = this.itemForm.value;
    this.addItem.emit(item);
    formDirective.resetForm();
    this.itemForm.reset();
  }

  remove(item: IBudgetItem) {
    this.removeItem.emit(item);
  }

  initializeFormGroup() {
    this.itemForm = this.builder.group({
      date: ['', Validators.required],
      source: ['', [Validators.required, Validators.minLength(3)]],
      amount: ['', [Validators.required, Validators.min(0)]],
    });
  }
}
