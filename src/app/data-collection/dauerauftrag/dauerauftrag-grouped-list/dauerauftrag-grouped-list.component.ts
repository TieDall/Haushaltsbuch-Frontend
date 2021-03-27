import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DauerauftragGrouped } from 'src/app/shared/models/dauerauftrag-grouped';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { DauerauftragGroupedEditComponent } from '../dauerauftrag-grouped-edit/dauerauftrag-grouped-edit.component';

@Component({
  selector: 'app-dauerauftrag-grouped-list',
  templateUrl: './dauerauftrag-grouped-list.component.html',
  styleUrls: ['./dauerauftrag-grouped-list.component.scss']
})
export class DauerauftragGroupedListComponent implements OnInit, OnDestroy {

  private readonly subsciptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Dauerauftrag/GetDauerauftraegeGrouped`;

  public data: DauerauftragGrouped[] = [];
  public columns: string[] = ['status', 'kategorie', 'bezeichnung', 'betrag', 'actions'];

  constructor(
    private readonly httpClient: HttpClient,
    private readonly dialog: MatDialog
  ) { }

  private loadData(): Observable<DauerauftragGrouped[]> {
    return this.httpClient
      .get<DauerauftragGrouped[]>(`${this.url}`)
      .pipe(
        tap((dauerauftraegeGrouped: DauerauftragGrouped[]) => {
          this.data = dauerauftraegeGrouped.sort((a, b) => a.bezeichnung.localeCompare(b.bezeichnung))
        })
      );
  }

  public create() {
    this.subsciptions.add(
      this.dialog
        .open(DauerauftragGroupedEditComponent)
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
  }

  public ngOnDestroy(): void {
    this.subsciptions.unsubscribe();
  }

}
