import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as moment from 'moment';
import { Observable, Subscription, zip } from 'rxjs';
import { tap, switchMap, finalize } from 'rxjs/operators';
import { ReportMonthService } from 'src/app/reporting/services/report-month.service';
import { Buchung } from 'src/app/shared/models/buchung';
import { Dauerauftrag } from 'src/app/shared/models/dauerauftrag';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-report-widget-monatsbilanz',
  templateUrl: './report-widget-monatsbilanz.component.html',
  styleUrls: ['./report-widget-monatsbilanz.component.scss']
})
export class ReportWidgetMonatsbilanzComponent implements OnInit, OnDestroy {

  @Output() loaded = new EventEmitter<boolean>();

  public isSelfLoaded = false;

  private readonly subscriptions = new Subscription();

  private readonly urlBuchung = `${AppConfigService.appConfig.apiServer.url}Buchung/GetBuchungenByMonth`;
  private readonly urlDauerauftrag = `${AppConfigService.appConfig.apiServer.url}Dauerauftrag/GetDauerauftraegeByMonth`;

  public bilanz = 0;

  public einnahmen = 0;
  public einnahmenVar = 0;
  public einnahmenFix = 0;

  public ausgaben = 0;
  public ausgabenVar = 0;
  public ausgabenFix = 0;

  public chartOptions: EChartsOption;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly reportMonthService: ReportMonthService
  ) { }

  private loadData(month: number, year: number): Observable<any> {
    return zip(
      this.httpClient.get(`${this.urlBuchung}/${year}/${month}`),
      this.httpClient.get(`${this.urlDauerauftrag}/${year}/${month}`)
    ).pipe(
      tap(([buchungen, dauerauftraege]) => {
        this.einnahmenVar = (buchungen as Buchung[]).filter(x => x.isEinnahme).reduce((acc, cur) => acc + cur.betrag, 0);
        this.ausgabenVar = (buchungen as Buchung[]).filter(x => !x.isEinnahme).reduce((acc, cur) => acc + cur.betrag, 0);

        this.einnahmenFix = (dauerauftraege as Dauerauftrag[]).filter(x => x.isEinnahme).reduce((acc, cur) => acc + cur.betrag, 0);
        this.ausgabenFix = (dauerauftraege as Dauerauftrag[]).filter(x => !x.isEinnahme).reduce((acc, cur) => acc + cur.betrag, 0);

        this.einnahmen = this.einnahmenFix + this.einnahmenVar;
        this.ausgaben = this.ausgabenFix + this.ausgabenVar;
        this.bilanz = this.einnahmen - this.ausgaben;
      }),
      finalize(() => this.loaded.emit(true)));
  }

  private setGraph(einnahmenFix: number, einnahmenVar: number, ausgabenFix: number, ausgabenVar: number) {
    this.chartOptions = {
      grid: {
        containLabel: true
      },
      legend: {
        data: ['fixe Einnahmen', 'variable Einnahmen', 'fixe Ausgaben', 'variable Ausgaben']
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Einnahmen',
          type: 'bar',
          data: [einnahmenFix + einnahmenVar],
          itemStyle: {
            color: '#196F3D'
          }
        },
        {
          name: 'fixe Einnahmen',
          type: 'bar',
          stack: 'einnahme',
          data: [einnahmenFix],
          itemStyle: {
            color: '#229954'
          }
        },
        {
          name: 'variable Einnahmen',
          type: 'bar',
          stack: 'einnahme',
          data: [einnahmenVar],
          itemStyle: {
            color: '#52BE80'
          }
        },
        {
          name: 'Ausgaben',
          type: 'bar',
          data: [ausgabenFix + ausgabenVar],
          itemStyle: {
            color: '#7B241C'
          }
        },
        {
          name: 'fixe Ausgaben',
          type: 'bar',
          stack: 'ausgabe',
          data: [ausgabenFix],
          itemStyle: {
            color: '#A93226'
          }
        },
        {
          name: 'variable Ausgaben',
          type: 'bar',
          stack: 'ausgabe',
          data: [ausgabenVar],
          itemStyle: {
            color: '#CD6155'
          }
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.loaded.subscribe((isLoaded: boolean) => this.isSelfLoaded = isLoaded);

    this.loaded.emit(false);

    this.subscriptions.add(
      this.loadData(moment().month() + 1, moment().year())
        .pipe(
          tap(() => this.setGraph(this.einnahmenFix, this.einnahmenVar, this.ausgabenFix, this.ausgabenVar))
        )
        .subscribe()
    );

    this.subscriptions.add(
      this.reportMonthService.subject
        .pipe(
          tap(() => this.loaded.emit(false)),
          switchMap((x: { month: number, year: number }) => this.loadData(x.month, x.year)),
          tap(() => this.setGraph(this.einnahmenFix, this.einnahmenVar, this.ausgabenFix, this.ausgabenVar)),
          finalize(() => this.loaded.emit(false))
        )
        .subscribe()
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
