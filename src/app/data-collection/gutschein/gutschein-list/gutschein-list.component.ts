import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { tap, finalize, switchMap } from 'rxjs/operators';
import { Gutschein } from 'src/app/shared/models/gutschein';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
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

  constructor(
    private readonly httpClient: HttpClient,
    private readonly dialog: MatDialog
  ) { }

  private load(): Observable<Gutschein[]> {
    this.loaded = false;
    return this.httpClient.get<Gutschein[]>(`${this.url}`)
      .pipe(
        tap((gutscheine: Gutschein[]) => {
          this.data = gutscheine.sort((a, b) => new Date(b.ablaufdatum).getTime() - new Date(a.ablaufdatum).getTime());
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
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
