import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { DauerauftragGrouped } from 'src/app/shared/models/dauerauftrag-grouped';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { BackendService } from 'src/app/shared/services/backend.service';
import { DauerauftragEditComponent } from '../dauerauftrag-edit/dauerauftrag-edit.component';
import { DauerauftragGroupedEditComponent } from '../dauerauftrag-grouped-edit/dauerauftrag-grouped-edit.component';

@Component({
  selector: 'app-dauerauftrag-grouped-list',
  templateUrl: './dauerauftrag-grouped-list.component.html',
  styleUrls: ['./dauerauftrag-grouped-list.component.scss']
})
export class DauerauftragGroupedListComponent implements OnInit, OnDestroy {

  private readonly subsciptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Dauerauftrag/GetGrouped`;

  public data: DauerauftragGrouped[] = [];
  public columns: string[] = ['status', 'kategorie', 'bezeichnung', 'betrag', 'actions'];

  public loaded = false;

  public disableButton = true;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly dialog: MatDialog,
    private readonly backendService: BackendService,
    private readonly snackBar: MatSnackBar
  ) { }

  private loadData(): Observable<DauerauftragGrouped[]> {
    this.loaded = false;
    return this.httpClient
      .get<DauerauftragGrouped[]>(`${this.url}`)
      .pipe(
        tap((dauerauftraegeGrouped: DauerauftragGrouped[]) => {
          this.data = dauerauftraegeGrouped.sort((a, b) => a.bezeichnung.localeCompare(b.bezeichnung))
        }),
        finalize(() => this.loaded = true),
        catchError(() => {
          this.snackBar.open('Fehler beim Laden.', 'Ok', {duration: 3000});
          return of([]);
        })
      );
  }

  public create() {
    this.subsciptions.add(
      this.dialog
        .open(DauerauftragEditComponent, {disableClose: true})
        .afterClosed()
        .pipe(
          switchMap(() => this.loadData())
        )
        .subscribe());
  }

  public edit(dauerauftragGrouped: DauerauftragGrouped) {
    this.subsciptions.add(
      this.dialog
        .open(
          DauerauftragGroupedEditComponent,
          {
            data: dauerauftragGrouped
          })
        .afterClosed()
        .pipe(
          switchMap(() => this.loadData())
        )
        .subscribe());
  }

  public ngOnInit(): void {
    this.subsciptions.add(this.loadData().subscribe());

    this.subsciptions.add(
      this.backendService.backendReachable.subscribe((x: boolean) => {
        this.disableButton = !x;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subsciptions.unsubscribe();
  }

}
