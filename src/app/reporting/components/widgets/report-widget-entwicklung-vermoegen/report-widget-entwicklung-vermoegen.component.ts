import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-report-widget-entwicklung-vermoegen',
  templateUrl: './report-widget-entwicklung-vermoegen.component.html',
  styleUrls: ['./report-widget-entwicklung-vermoegen.component.scss']
})
export class ReportWidgetEntwicklungVermoegenComponent implements OnInit, OnDestroy {

  private readonly subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Auswertung/GetVermoegen`;

  public data: number[] = [];
  public label: string[] = [];
  public chartOptionEntwicklung: EChartsOption;

  constructor(
    private readonly httpClient: HttpClient
  ) {
    this.initLabel();
  }

  public ngOnInit(): void {
    this.load();
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
          })
        )
        .subscribe()
    );
  }

  private initLabel() {
    this.label = [
      `${(moment().add(-5, 'months').month() + 1)} / ${(moment().add(-5, 'months').year())}`,
      `${(moment().add(-4, 'months').month() + 1)} / ${(moment().add(-4, 'months').year())}`,
      `${(moment().add(-3, 'months').month() + 1)} / ${(moment().add(-3, 'months').year())}`,
      `${(moment().add(-2, 'months').month() + 1)} / ${(moment().add(-2, 'months').year())}`,
      `${(moment().add(-1, 'months').month() + 1)} / ${(moment().add(-1, 'months').year())}`,
      `${(moment().month() + 1)} / ${(moment().year())}`
    ];
  }

  private processChart() {
    this.chartOptionEntwicklung = {
      grid: {
        containLabel: true
      },
      legend: {
        data: ['Vermoegen'],
        orient: 'vertical'
      },
      xAxis: {
        type: 'category',
        data: this.label,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Vermoegen',
          data: this.data,
          type: 'line',
        }
      ],
    };
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
