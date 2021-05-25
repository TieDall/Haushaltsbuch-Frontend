import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { Konfiguration } from 'src/app/shared/models/konfiguration';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { KonfigurationEditComponent } from '../konfiguration-edit/konfiguration-edit.component';

@Component({
  selector: 'app-konfiguration-list',
  templateUrl: './konfiguration-list.component.html',
  styleUrls: ['./konfiguration-list.component.scss']
})
export class KonfigurationListComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();

  public readonly url = `${AppConfigService.appConfig.apiServer.url}Konfiguration`;

  public data: Konfiguration[] = [];
  public columns: string[] = ['parameter', 'wert', 'actions'];

  public loaded = false;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) { }

  private loadData(): Observable<Konfiguration[]> {
    this.loaded = false;
    return this.httpClient
      .get<Konfiguration[]>(this.url)
      .pipe(
        tap((konfigurationen: Konfiguration[]) => {
          this.data = konfigurationen.sort((a, b) => a.parameter.localeCompare(b.parameter));
        }),
        catchError(() => {
          this.snackBar.open('Fehler beim Laden.', 'Ok', {duration: 3000});
          return of([]);
        }),
        finalize(() => this.loaded = true)
      );
  }

  public edit(konfiguration: Konfiguration) {
    this.subscriptions.add(
      this.dialog.open(KonfigurationEditComponent, {
        data: konfiguration,
        width: '500px',
        disableClose: true
      })
        .afterClosed()
        .pipe(
          switchMap(() => this.loadData())
        )
        .subscribe()
    );
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.loadData().subscribe());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
