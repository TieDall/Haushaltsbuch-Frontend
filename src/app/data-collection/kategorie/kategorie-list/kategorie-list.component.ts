import { Component, OnDestroy, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subscription } from 'rxjs';
import { Kategorie } from 'src/app/shared/models/kategorie';
import { KategorieEditComponent } from '../kategorie-edit/kategorie-edit.component';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private readonly dialog: MatDialog,
    private readonly httpClient: HttpClient
  ) { }

  private loadData(): Observable<Kategorie[]> {
    return this.httpClient.get<Kategorie[]>(this.url)
      .pipe(
        tap((kategorien: Kategorie[]) => {
          this.einnahmeKategorieData = kategorien
            .filter(x => x.isEinnahme)
            .sort((a, b) => a.bezeichnung.localeCompare(b.bezeichnung));
          this.ausgabeKategorieData = kategorien
            .filter(x => !x.isEinnahme)
            .sort((a, b) => a.bezeichnung.localeCompare(b.bezeichnung));
        })
      );
  }

  public create() {
    this.subscriptions.add(
      this.dialog
        .open(KategorieEditComponent)
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
            data: kategorie
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
    this.subscriptions.add(
      this.httpClient
        .delete(`${this.url}/${kategorie.id}`)
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
