import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { tap, switchMap, finalize } from 'rxjs/operators';
import { ReportMonthService } from 'src/app/reporting/services/report-month.service';
import { Dauerauftrag } from 'src/app/shared/models/dauerauftrag';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-report-widget-monatsdauerauftraege',
  templateUrl: './report-widget-monatsdauerauftraege.component.html',
  styleUrls: ['./report-widget-monatsdauerauftraege.component.scss']
})
export class ReportWidgetMonatsdauerauftraegeComponent implements OnInit, OnDestroy {

  @Output() loaded = new EventEmitter<boolean>();

  public isSelfLoaded = false;

  private readonly subscriptions = new Subscription();

  private readonly urlDauerauftrag = `${AppConfigService.appConfig.apiServer.url}Dauerauftrag/GetDauerauftraegeByMonth`;

  public data: Dauerauftrag[] = [];
  public columns: string[] = ['bezeichnung', 'betrag'];

  constructor(
    private readonly httpClient: HttpClient,
    private readonly reportMonthService: ReportMonthService
  ) { }

  private loadData(month: number, year: number): Observable<any> {
    return this.httpClient.get(`${this.urlDauerauftrag}/${year}/${month}`)
      .pipe(
        tap((dauerauftraege: Dauerauftrag[]) => {
          const einnahmen = dauerauftraege.filter(x => x.isEinnahme).sort((a, b) => b.betrag - a.betrag);
          const ausgaben = dauerauftraege.filter(x => !x.isEinnahme).sort((a, b) => b.betrag - a.betrag);

          const summeEinnahmen = einnahmen.reduce((acc, cur) => acc + cur.betrag, 0);
          const summeAusgaben = ausgaben.reduce((acc, cur) => acc + cur.betrag, 0);

          this.data = [...einnahmen, ...ausgaben];
          this.data.push({
            betrag: summeEinnahmen - summeAusgaben,
            isEinnahme: (summeEinnahmen - summeAusgaben) >= 0
          } as Dauerauftrag);
        }),
        finalize(() => this.loaded.emit(true))
      );
  }

  public ngOnInit(): void {
    this.loaded.subscribe((isLoaded: boolean) => this.isSelfLoaded = isLoaded);

    this.loaded.emit(false);

    this.subscriptions.add(
      this.loadData(moment().month() + 1, moment().year())
        .subscribe()
    );

    this.subscriptions.add(
      this.reportMonthService.subject
        .pipe(
          tap(() => this.loaded.emit(false)),
          switchMap((x: { month: number, year: number }) => this.loadData(x.month, x.year)),
          finalize(() => this.loaded.emit(false))
        )
        .subscribe()
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
