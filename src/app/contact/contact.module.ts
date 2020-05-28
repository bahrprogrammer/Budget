import { NgModule } from '@angular/core';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ContactModule { }
