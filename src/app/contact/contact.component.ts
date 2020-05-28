import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form: FormGroup;

  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.form = this.builder.group({
      subject: ['', Validators.required],
      message: ['', [Validators.required]]
    });
  }

  send(){
    alert('message sent');
  }

}
