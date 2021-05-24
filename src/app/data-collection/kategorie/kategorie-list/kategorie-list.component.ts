import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subscription } from 'rxjs';
import { Kategorie } from 'src/app/shared/models/kategorie';
import { KategorieEditComponent } from '../kategorie-edit/kategorie-edit.component';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { HttpClient } from '@angular/common/http';
import { KategorieDeleteDialogComponent } from '../kategorie-delete-dialog/kategorie-delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from 'src/app/shared/services/backend.service';

@Component({
  selector: 'app-kategorie-list',
  templateUrl: './kategorie-list.component.html',
  styleUrls: ['./kategorie-list.component.scss']
})
export class KategorieListComponent implements OnInit, OnDestroy {

  private readonly subscriptions = new Subscription();

  public readonly columns = ['icon', 'bezeichnung', 'actions'];
  public einnahmeKategorieData: Kategorie[] = [];
  public ausgabeKategorieData: Kategorie[] = [];

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Kategorie`;

  public loaded = false;

  public disableButton = true;

  constructor(
    private readonly dialog: MatDialog,
    private readonly httpClient: HttpClient,
    private readonly backendService: BackendService,
    private readonly snackBar: MatSnackBar
  ) { }

  private loadData(): Observable<Kategorie[]> {
    this.loaded = false;
    return this.httpClient.get<Kategorie[]>(this.url)
      .pipe(
        tap((kategorien: Kategorie[]) => {
          this.einnahmeKategorieData = kategorien
            .filter(x => x.isEinnahme)
            .sort((a, b) => a.bezeichnung.localeCompare(b.bezeichnung));
          this.ausgabeKategorieData = kategorien
            .filter(x => !x.isEinnahme)
            .sort((a, b) => a.bezeichnung.localeCompare(b.bezeichnung));
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
        .open(KategorieEditComponent, {disableClose: true})
        .afterClosed()
        .pipe(
          switchMap(() => this.loadData())
        )
        .subscribe()
    );
  }

  public edit(kategorie: Kategorie) {
    this.subscriptions.add(
      this.dialog
        .open(
          KategorieEditComponent,
          {
            data: kategorie,
            disableClose: true
          }
        )
        .afterClosed()
        .pipe(
          switchMap(() => this.loadData())
        )
        .subscribe()
    );
  }

  public delete(kategorie: Kategorie) {
    this.subscriptions.add(this.openDeleteDialog(kategorie).subscribe());
  }

  private openDeleteDialog(kategorie: Kategorie) {
    return this.dialog.open(KategorieDeleteDialogComponent, {data: kategorie, disableClose: true})
      .afterClosed()
      .pipe(
        switchMap((continueDelete: boolean) => continueDelete ? this.sendDeleteRequest(kategorie) : of([]))
      );
  }

  private sendDeleteRequest(kategorie: Kategorie) {
    return this.httpClient
      .delete(`${this.url}/${kategorie.id}`)
      .pipe(
        switchMap(() => this.loadData())
      );
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.loadData().subscribe());

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
