import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as moment from 'moment';
import { Observable, Subscription, zip } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ReportMonthService } from 'src/app/reporting/services/report-month.service';
import { Buchung } from 'src/app/shared/models/buchung';
import { Dauerauftrag } from 'src/app/shared/models/dauerauftrag';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-report-widget-monatsausgaben',
  templateUrl: './report-widget-monatsausgaben.component.html',
  styleUrls: ['./report-widget-monatsausgaben.component.scss']
})
export class ReportWidgetMonatsausgabenComponent implements OnInit, OnDestroy {

  private readonly subscriptions = new Subscription();

  private readonly urlBuchung = `${AppConfigService.appConfig.apiServer.url}Buchung/GetBuchungenByMonth`;
  private readonly urlDauerauftrag = `${AppConfigService.appConfig.apiServer.url}Dauerauftrag/GetDauerauftraegeByMonth`;

  public data: {
    bezeichnung: string;
    summe: number;
    icon: string;
  }[] = [];

  public chartOptions;
  public variableChecked = true;
  public fixeChecked = true;

  public currentMonth = 0;
  public currentYear = 0;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly reportMonthService: ReportMonthService
  ) {
    this.currentMonth = moment().month() + 1;
    this.currentYear = moment().year();
  }

  public varChange(value: MatCheckboxChange) {
    this.variableChecked = value.checked;
    this.subscriptions.add(
      this.loadData()
        .pipe(
          tap(() => this.setGraph())
        )
        .subscribe());
  }
  public fixChange(value: MatCheckboxChange) {
    this.fixeChecked = value.checked;
    this.subscriptions.add(
      this.loadData()
        .pipe(
          tap(() => this.setGraph())
        )
        .subscribe());
  }

  private loadData(): Observable<any> {
    this.data = [];

    return zip(
      this.httpClient.get(`${this.urlBuchung}/${this.currentYear}/${this.currentMonth}`),
      this.httpClient.get(`${this.urlDauerauftrag}/${this.currentYear}/${this.currentMonth}`)
    ).pipe(
      tap(([buchungen, dauerauftraege]) => {
        const kategorienBuchung = (buchungen as Buchung[])
          .filter(x => !x.isEinnahme)
          .map(x => x.kategorie.bezeichnung)
          .filter((value, index, self) => self.indexOf(value) === index);

        const kategorienDauerauftrag = (dauerauftraege as Dauerauftrag[])
          .filter(x => !x.isEinnahme)
          .map(x => x.kategorie.bezeichnung)
          .filter((value, index, self) => self.indexOf(value) === index);

        let kategorien = [];
        if (this.variableChecked && !this.fixeChecked) {
          kategorien = kategorienBuchung;
        } else if (!this.variableChecked && this.fixeChecked) {
          kategorien = kategorienDauerauftrag;
        } else {
          kategorien = [...kategorienBuchung, ...kategorienDauerauftrag.filter(x => !kategorienBuchung.includes(x))];
        }

        for (const kategorie of kategorien) {

          const newDataItem: {
            bezeichnung: string;
            summe: number;
            icon: string;
          } = { bezeichnung: kategorie, summe: 0, icon: '' };

          if (this.variableChecked && (buchungen as Buchung[]).some(x => x.kategorie.bezeichnung === kategorie)) {
            newDataItem.icon = (buchungen as Buchung[])
              .filter(x => x.kategorie.bezeichnung === kategorie && !x.isEinnahme)[0].kategorie.icon;
            newDataItem.summe += (buchungen as Buchung[])
              .filter(x => x.kategorie.bezeichnung === kategorie && !x.isEinnahme)
              .reduce((acc, cur) => acc + cur.betrag, 0);
          }

          if (this.fixeChecked && (dauerauftraege as Dauerauftrag[]).some(x => x.kategorie.bezeichnung == kategorie)) {
            newDataItem.icon = (dauerauftraege as Dauerauftrag[])
              .filter(x => x.kategorie.bezeichnung === kategorie && !x.isEinnahme)[0].kategorie.icon;
            newDataItem.summe += (dauerauftraege as Dauerauftrag[])
              .filter(x => x.kategorie.bezeichnung === kategorie && !x.isEinnahme)
              .reduce((acc, cur) => acc + cur.betrag, 0);
          }


          newDataItem.summe = newDataItem.summe.toFixed(2) as any;
          this.data.push(newDataItem);
        }

        this.data.sort((a, b) => b.summe - a.summe);
      }))
  }

  private setGraph() {
    this.chartOptions = {
      grid: {
        containLabel: true
      },
      legend: {
        data: this.data.map(x => ({ name: x.bezeichnung, value: x.summe })),
        orient: 'horizontal',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}:<br/>{c}€ ({d}%)'
      },
      series: [
        {
          type: 'pie',
          data: this.data.map(x => ({ name: x.bezeichnung, value: x.summe })),
          center: ['50%', '60%'],
          labelLine: {
            show: false
          },
          avoidLabelOverlap: true,
          radius: ['50%', '75%'],
          label: {
            show: false
          }
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.reportMonthService.subject
        .pipe(
          tap((x: { month: number, year: number }) => {
            this.currentMonth = x.month;
            this.currentYear = x.year;
          }),
          switchMap(() => this.loadData()),
          tap(() => this.setGraph())
        )
        .subscribe());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
