import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCalendarComponent } from './budget-calendar.component';
import { Calendar } from '../../models/calendar';

describe('BudgetCalendarComponent', () => {
  let component: BudgetCalendarComponent;
  let fixture: ComponentFixture<BudgetCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetCalendarComponent);
    fixture.componentInstance.calendar = new Calendar(new Date('1/2/2020'));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
