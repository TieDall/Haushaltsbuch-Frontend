import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Dauerauftrag } from 'src/app/shared/models/dauerauftrag';
import { DauerauftragGrouped } from 'src/app/shared/models/dauerauftrag-grouped';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { DauerauftragEditComponent } from '../dauerauftrag-edit/dauerauftrag-edit.component';

@Component({
  selector: 'app-dauerauftrag-grouped-edit',
  templateUrl: './dauerauftrag-grouped-edit.component.html',
  styleUrls: ['./dauerauftrag-grouped-edit.component.scss']
})
export class DauerauftragGroupedEditComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();

  public readonly url = `${AppConfigService.appConfig.apiServer.url}Dauerauftrag/GetDauerauftraege`;
  public readonly urlDelete = `${AppConfigService.appConfig.apiServer.url}Dauerauftrag`;

  public tableData: Dauerauftrag[] = [];
  public columns: string[] = ['status', 'betrag', 'zeit', 'actions'];

  public header = '';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly dialog: MatDialog,
    public dialogRef: MatDialogRef<DauerauftragGroupedEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DauerauftragGrouped
  ) { }

  private loadData(): Observable<Dauerauftrag[]> {
    return this.httpClient
      .get<Dauerauftrag[]>(`${this.url}/${this.data.bezeichnung}/${this.data.kategorie.id}`)
      .pipe(
        tap((dauerauftrag: Dauerauftrag[]) => {
          this.tableData = dauerauftrag.sort((a, b) => moment(a.ende).isAfter(b.ende) ? -1 : 0);
          this.header = this.tableData[0].bezeichnung;
        })
      );
  }

  public create() {
    const dauerauftrag = new Dauerauftrag();
    dauerauftrag.id = 0;
    dauerauftrag.isEinnahme = this.tableData[0].isEinnahme;
    dauerauftrag.bezeichnung = this.tableData[0].bezeichnung;
    dauerauftrag.betrag = this.tableData[0].betrag;
    dauerauftrag.kategorie = this.tableData[0].kategorie;
    dauerauftrag.kategorieId = this.tableData[0].kategorie.id;

    this.subscriptions.add(
      this.dialog.open(DauerauftragEditComponent, {
        data: dauerauftrag,
        disableClose: true
      })
        .afterClosed()
        .pipe(
          switchMap(() => this.loadData())
        )
        .subscribe()
    );
  }

  public edit(dauerauftrag: Dauerauftrag) {
    this.subscriptions.add(
      this.dialog.open(DauerauftragEditComponent, {
        data: dauerauftrag,
        disableClose: true
      })
        .afterClosed()
        .pipe(
          switchMap(() => this.loadData())
        )
        .subscribe()
    );
  }

  public delete(dauerauftrag: Dauerauftrag) {
    this.subscriptions.add(this.httpClient
      .delete(`${this.urlDelete}/${dauerauftrag.id}`)
      .pipe(
        switchMap(() => this.loadData())
      )
      .subscribe());
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.loadData().subscribe());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
