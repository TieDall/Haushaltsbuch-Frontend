import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-report-widget-entwicklung-bilanz',
  templateUrl: './report-widget-entwicklung-bilanz.component.html',
  styleUrls: ['./report-widget-entwicklung-bilanz.component.scss']
})
export class ReportWidgetEntwicklungBilanzComponent implements OnInit, OnDestroy {

  private readonly subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Auswertung/GetBilanz`;

  public data: number[] = [];
  public labelGraph: string[] = [];
  public labelTable: string[] = [];
  public mainData = new Map<string, number>();
  public chartOptionEntwicklung: EChartsOption;

  constructor(
    private readonly httpClient: HttpClient
  ) {
    this.initLabel();
  }

  private load() {
    const now = moment();
    const start = moment().add(-5, 'months');
    this.subscriptions.add(
      this.httpClient.get(`${this.url}/${moment(start).year()}/${moment(start).month() + 1}/${moment(now).year()}/${moment(now).month() + 1}`)
        .pipe(
          tap((result: number[]) => {
            this.data = result;
            this.processChart();

            for (let index = 0; index < this.data.length; index++) {
              this.mainData.set(this.labelTable[index], this.data[index]);
            }

            const sum = result.reduce((a, b) => a + b, 0);
            const avg = (sum / result.length) || 0;
            this.mainData.set('Durchschnitt', avg);
          })
        )
        .subscribe()
    );
  }

  private initLabel() {
    this.labelGraph = [
      `${(moment().add(-5, 'months').month() + 1)} / ${(moment().add(-5, 'months').year())}`,
      `${(moment().add(-4, 'months').month() + 1)} / ${(moment().add(-4, 'months').year())}`,
      `${(moment().add(-3, 'months').month() + 1)} / ${(moment().add(-3, 'months').year())}`,
      `${(moment().add(-2, 'months').month() + 1)} / ${(moment().add(-2, 'months').year())}`,
      `${(moment().add(-1, 'months').month() + 1)} / ${(moment().add(-1, 'months').year())}`,
      `${(moment().month() + 1)} / ${(moment().year())}`
    ];

    this.labelTable = [...this.labelGraph, 'Durchschnitt'];
  }

  private processChart() {
    this.chartOptionEntwicklung = {
      grid: {
        containLabel: true
      },
      legend: {
        data: ['Bilanz'],
        orient: 'vertical'
      },
      xAxis: {
        type: 'category',
        data: this.labelGraph,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Bilanz',
          data: this.data,
          type: 'line',
        }
      ],
    };
  }

  public ngOnInit(): void {
    this.load();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
