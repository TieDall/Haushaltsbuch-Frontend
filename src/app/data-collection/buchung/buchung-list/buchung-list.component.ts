import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { Buchung } from 'src/app/shared/models/buchung';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { BtnBuchungService } from 'src/app/shared/services/btn-buchung.service';
import { BuchungEditComponent } from '../buchung-edit/buchung-edit.component';

@Component({
  selector: 'app-buchung-list',
  templateUrl: './buchung-list.component.html',
  styleUrls: ['./buchung-list.component.scss']
})
export class BuchungListComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Buchung`;

  public data: Buchung[] = [];
  public columns: string[] = ['buchungstag', 'kategorie', 'bezeichnung', 'betrag', 'actions'];

  public currentMonth: number;
  public currentYear: number;

  public loaded = false;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly dialog: MatDialog,
    private readonly btnBuchungService: BtnBuchungService,
    private readonly snackBar: MatSnackBar
  ) {
    this.initDate();
  }

  private initDate() {
    const now = moment();
    this.currentYear = now.year();
    this.currentMonth = now.month() + 1;
  }

  private loadData(year: number, month: number): Observable<Buchung[]> {
    this.loaded = false;
    this.data = [];
    return this.httpClient.get<Buchung[]>(`${this.url}/GetBuchungenByMonth/${year}/${month}`)
      .pipe(
        tap((buchungen: Buchung[]) => {
          this.data = buchungen.sort((a, b) => new Date(b.buchungstag).getTime() - new Date(a.buchungstag).getTime())
        }),
        catchError(() => {
          this.snackBar.open('Fehler beim Laden.', 'Ok', {duration: 3000});
          return of([]);
        }),
        finalize(() => this.loaded = true)
      );
  }

  public create() {
    this.subscriptions.add(
      this.dialog
        .open(BuchungEditComponent, {disableClose: true})
        .afterClosed()
        .pipe(
          switchMap(() => this.loadData(this.currentYear, this.currentMonth))
        )
        .subscribe()
    );
  }

  public edit(buchung: Buchung) {
    this.subscriptions.add(
      this.dialog
        .open(
          BuchungEditComponent,
          {
            data: buchung,
            disableClose: true
          }
        )
        .afterClosed()
        .pipe(
          switchMap(() => this.loadData(this.currentYear, this.currentMonth))
        )
        .subscribe()
    );
  }

  public delete(buchung: Buchung) {
    this.subscriptions.add(
      this.httpClient
        .delete(`${this.url}/${buchung.id}`)
        .pipe(
          switchMap(() => this.loadData(this.currentYear, this.currentMonth))
        )
        .subscribe());
  }

  public loadBefore() {
    const date = new Date(this.currentYear, this.currentMonth - 1);
    const dateAsMoment = moment(date);
    const newDateAsMoment = dateAsMoment.add(-1, 'month');

    this.currentMonth = newDateAsMoment.month() + 1;
    this.currentYear = newDateAsMoment.year();

    this.subscriptions.add(this.loadData(this.currentYear, this.currentMonth).subscribe());
  }

  public loadNext() {
    const date = new Date(this.currentYear, this.currentMonth - 1);
    const dateAsMoment = moment(date);
    const newDateAsMoment = dateAsMoment.add(1, 'month');

    this.currentMonth = newDateAsMoment.month() + 1;
    this.currentYear = newDateAsMoment.year();

    this.subscriptions.add(this.loadData(this.currentYear, this.currentMonth).subscribe());
  }

  public chosenMonthHandler(value: any, datepicker: MatDatepicker<moment.Moment>) {
    const date = moment(value);
    this.currentMonth = date.month() + 1;
    this.currentYear = date.year();
    datepicker.close();
    this.subscriptions.add(this.loadData(this.currentYear, this.currentMonth).subscribe());
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.btnBuchungService.subject
        .pipe(
          switchMap(() => this.loadData(this.currentYear, this.currentMonth))
        )
        .subscribe()
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
