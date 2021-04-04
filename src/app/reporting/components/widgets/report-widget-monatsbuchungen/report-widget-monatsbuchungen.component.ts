import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { ReportMonthService } from 'src/app/reporting/services/report-month.service';
import { Buchung } from 'src/app/shared/models/buchung';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-report-widget-monatsbuchungen',
  templateUrl: './report-widget-monatsbuchungen.component.html',
  styleUrls: ['./report-widget-monatsbuchungen.component.scss']
})
export class ReportWidgetMonatsbuchungenComponent implements OnInit, OnDestroy {

  @Output() loaded = new EventEmitter<boolean>();

  private readonly subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Buchung`;

  public data: Buchung[] = [];
  public columns: string[] = ['buchungstag', 'kategorie', 'bezeichnung', 'betrag'];

  constructor(
    private readonly httpClient: HttpClient,
    private readonly reportMonthService: ReportMonthService
  ) { }

  private loadData(year: number, month: number): Observable<Buchung[]> {
    return this.httpClient.get<Buchung[]>(`${this.url}/GetBuchungenByMonth/${year}/${month}`)
      .pipe(
        tap((buchungen: Buchung[]) => {
          this.data = [];
          this.data = buchungen.sort((a, b) => new Date(b.buchungstag).getTime() - new Date(a.buchungstag).getTime());

          const summeEinnahmen = buchungen.filter(x => x.isEinnahme).reduce((acc, cur) => acc + cur.betrag, 0);
          const summeAusgaben = buchungen.filter(x => !x.isEinnahme).reduce((acc, cur) => acc + cur.betrag, 0);

          this.data.push({
            betrag: summeEinnahmen - summeAusgaben,
            isEinnahme: (summeEinnahmen - summeAusgaben) >= 0
          } as Buchung);
        }),
        finalize(() => this.loaded.emit(true))
      );
  }

  public ngOnInit(): void {
    this.loaded.emit(false);
    this.subscriptions.add(
      this.loadData(moment().year(), moment().month() + 1)
        .subscribe()
    );

    this.subscriptions.add(
      this.reportMonthService.subject
        .pipe(
          switchMap((x: { month: number, year: number }) => this.loadData(x.year, x.month))
        )
        .subscribe()
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
