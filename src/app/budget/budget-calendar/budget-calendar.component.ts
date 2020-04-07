import { Component, OnInit } from '@angular/core';

import { IDay } from '../../models/interfaces';

@Component({
  selector: 'app-budget-calendar',
  templateUrl: './budget-calendar.component.html',
  styleUrls: ['./budget-calendar.component.scss']
})
export class BudgetCalendarComponent implements OnInit {
  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  calendarWeeks: IDay[][] = [];

  constructor() { }

  ngOnInit(): void {
    this.createCalendarWeeks();
    console.log(this.calendarWeeks);
  }

  createCalendarWeeks() {
    const firstDay = new Date(this.currentYear, this.currentMonth).getDay();
    const daysInMonth = 32 - new Date(this.currentYear, this.currentMonth, 32).getDate();
    let day = 0;

    const firstWeekData = this.createFirstWeek(firstDay);
    this.calendarWeeks.push(firstWeekData.week);
    day = firstWeekData.day;

    for (let j = 0; j < 4; j++) {
      if (day >= daysInMonth) {
        break;
      }
      const weekData = this.createSubsiquentWeek(day, daysInMonth);
      this.calendarWeeks.push(weekData.week);
      day = weekData.day;
    }
  }

  createFirstWeek(firstDay: number): any {
    const week = [];
    let dayDate = 1;

    for (let i = 0; i < 7; i++) {
      let day: IDay;

      if (i < firstDay) {
        week.push(day);
      } else {
        day = {
          day: dayDate
        };
        week.push(day);
        dayDate++;
      }
    }

    const result = {
      week,
      day: dayDate
    };

    return result;
  }

  createSubsiquentWeek(firstDay: number, lastDay: number): any {
    const week = [];
    let dayDate = firstDay;

    for (let i = 0; i < 7; i++) {
       let day: IDay;

       if (dayDate <= lastDay) {
        day = {
          day: dayDate
        };
        week.push(day);
        dayDate++;
       } else {
        week.push(day);
       }
     }

    const result = {
      week,
      day: dayDate
    }

    return result;
  }
}
