import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-budget-header',
  templateUrl: './budget-header.component.html',
  styleUrls: ['./budget-header.component.scss']
})
export class BudgetHeaderComponent implements OnInit {
  @Input()
  incomeTotal = 0;

  @Input()
  expenseTotal = 0;

  @Input()
  startingBalance;

  @Output()
  update = new EventEmitter();

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  get badgeClass(): string {
    const percent = (this.expenseTotal / (this.incomeTotal + this.startingBalance));
    const highRisk = .85;
    const mediumRisk = .5;

    if (percent > highRisk) {
      return 'badge badge-danger';
    } else if ( percent > mediumRisk) {
      return 'badge badge-dark';
    } else {
      return 'badge badge-success';
    }
  }

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          display: false
        },
        gridLines: {
          display: false
        }
      }]
    }
  };
  barChartLabels: Label[] = ['Expenses', 'Income'];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [];

  get remainder(): number {
    const starting = this.startingBalance ? this.startingBalance : 0;
    return this.incomeTotal + starting - this.expenseTotal;
  }

  constructor() { }

  ngOnInit() {
    this.barChartData = [
      {
        data: [this.expenseTotal, this.incomeTotal],
        label: 'Budget totals',
        backgroundColor: [
          'rgba(204, 0, 0)',
          'rgba(0, 153, 0)'
        ]
      }
    ];
  }

  updateChart() {
    setTimeout(() => {
      this.barChartData = [
        {
          data: [this.expenseTotal, this.incomeTotal],
          label: 'Budget totals',
          backgroundColor: [
            'rgba(204, 0, 0)',
            'rgba(0, 153, 0)'
          ]
        }
      ];
    }, 500);
    this.chart.chart.update();
  }

  updateStartingBalance() {
    setTimeout(() => {
      this.update.emit();
    }, 250);
  }
}
