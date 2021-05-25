import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, Subscription } from 'rxjs';
import { tap, finalize, switchMap, catchError } from 'rxjs/operators';
import { Gutschein } from 'src/app/shared/models/gutschein';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { BackendService } from 'src/app/shared/services/backend.service';
import { GutscheinEditComponent } from '../gutschein-edit/gutschein-edit.component';

@Component({
  selector: 'app-gutschein-list',
  templateUrl: './gutschein-list.component.html',
  styleUrls: ['./gutschein-list.component.scss']
})
export class GutscheinListComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Gutschein`;

  public data: Gutschein[] = [];
  public columns: string[] = ['status', 'bezeichnung', 'betrag', 'ablaufdatum', 'actions'];

  public loaded = false;

  public disableButton = true;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly dialog: MatDialog,
    private readonly backendService: BackendService,
    private readonly snackBar: MatSnackBar
  ) { }

  private load(): Observable<Gutschein[]> {
    this.loaded = false;
    return this.httpClient.get<Gutschein[]>(`${this.url}`)
      .pipe(
        tap((gutscheine: Gutschein[]) => {
          this.data = gutscheine.sort((a, b) => new Date(b.ablaufdatum).getTime() - new Date(a.ablaufdatum).getTime());
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
        .open(GutscheinEditComponent, {disableClose: true})
        .afterClosed()
        .pipe(
          switchMap(() => this.load())
        )
        .subscribe()
    );
  }

  public edit(gutschein: Gutschein) {
    this.subscriptions.add(
      this.dialog
        .open(
          GutscheinEditComponent,
          {
            data: gutschein,
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

  public delete(gutschein: Gutschein) {
    this.subscriptions.add(
      this.httpClient
        .delete(`${this.url}/${gutschein.id}`)
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
