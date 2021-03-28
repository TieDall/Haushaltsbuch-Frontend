import { Component, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { ReportMonthService } from 'src/app/reporting/services/report-month.service';

@Component({
  selector: 'app-report-widget-monatsauswahl',
  templateUrl: './report-widget-monatsauswahl.component.html',
  styleUrls: ['./report-widget-monatsauswahl.component.scss']
})
export class ReportWidgetMonatsauswahlComponent implements OnInit {

  public currentMonth: number;
  public currentYear: number;

  constructor(
    private readonly monthService: ReportMonthService
  ) {
    this.currentMonth = moment().month() + 1;
    this.currentYear = moment().year();

    this.monthService.subject.next({ month: this.currentMonth, year: this.currentYear });
  }

  public loadBefore() {
    const date = new Date(this.currentYear, this.currentMonth - 1);
    const dateAsMoment = moment(date);
    const newDateAsMoment = dateAsMoment.add(-1, 'month');

    this.currentMonth = newDateAsMoment.month() + 1;
    this.currentYear = newDateAsMoment.year();

    this.monthService.subject.next({ month: this.currentMonth, year: this.currentYear });
  }

  public loadNext() {
    const date = new Date(this.currentYear, this.currentMonth - 1);
    const dateAsMoment = moment(date);
    const newDateAsMoment = dateAsMoment.add(1, 'month');

    this.currentMonth = newDateAsMoment.month() + 1;
    this.currentYear = newDateAsMoment.year();

    this.monthService.subject.next({ month: this.currentMonth, year: this.currentYear });
  }

  public chosenMonthHandler(value: any, datepicker: MatDatepicker<moment.Moment>) {
    const date = moment(value);
    this.currentMonth = date.month() + 1;
    this.currentYear = date.year();
    datepicker.close();

    this.monthService.subject.next({ month: this.currentMonth, year: this.currentYear });
  }

  ngOnInit(): void {
  }

}
