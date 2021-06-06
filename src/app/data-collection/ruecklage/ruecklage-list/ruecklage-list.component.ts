import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, Subscription } from 'rxjs';
import { tap, finalize, switchMap, catchError } from 'rxjs/operators';
import { Ruecklage } from 'src/app/shared/models/ruecklage';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { BackendService } from 'src/app/shared/services/backend.service';
import { RuecklageEditComponent } from '../ruecklage-edit/ruecklage-edit.component';

@Component({
  selector: 'app-ruecklage-list',
  templateUrl: './ruecklage-list.component.html',
  styleUrls: ['./ruecklage-list.component.scss']
})
export class RuecklageListComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Ruecklage`;

  public data: Ruecklage[] = [];
  public columns: string[] = ['bezeichnung', 'summe', 'actions'];

  public loaded = false;

  public disableButton = true;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly dialog: MatDialog,
    private readonly backendService: BackendService,
    private readonly snackBar: MatSnackBar
  ) { }

  private load(): Observable<Ruecklage[]> {
    this.loaded = false;
    return this.httpClient.get<Ruecklage[]>(`${this.url}`)
      .pipe(
        tap((ruecklage: Ruecklage[]) => {
          this.data = ruecklage.sort((a, b) => b.summe - a.summe);
          this.data.push({
            id: 0,
            bezeichnung: '',
            summe: ruecklage.reduce((acc, cur) => acc + cur.summe, 0),
            changed: null,
            created: null
          });
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
        .open(RuecklageEditComponent, {disableClose: true})
        .afterClosed()
        .pipe(
          switchMap(() => this.load())
        )
        .subscribe()
    );
  }

  public edit(ruecklage: Ruecklage) {
    this.subscriptions.add(
      this.dialog
        .open(
          RuecklageEditComponent,
          {
            data: ruecklage,
            disableClose: true
          }
        )
        .afterClosed()
        .pipe(
          switchMap(() => this.load())
        )
        .subscribe()
    );
  }

  public delete(ruecklage: Ruecklage) {
    this.subscriptions.add(
      this.httpClient
        .delete(`${this.url}/${ruecklage.id}`)
        .pipe(
          switchMap(() => this.load())
        )
        .subscribe());
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.load().subscribe()
    );

    this.subscriptions.add(
      this.backendService.backendReachable.subscribe((x: boolean) => {
        this.disableButton = !x;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
