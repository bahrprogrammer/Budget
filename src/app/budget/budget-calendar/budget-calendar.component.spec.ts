import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCalendarComponent } from './budget-calendar.component';

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
