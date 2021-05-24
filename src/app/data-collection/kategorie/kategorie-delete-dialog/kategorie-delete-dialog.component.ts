import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Buchung } from 'src/app/shared/models/buchung';
import { Kategorie } from 'src/app/shared/models/kategorie';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-kategorie-delete-dialog',
  templateUrl: './kategorie-delete-dialog.component.html',
  styleUrls: ['./kategorie-delete-dialog.component.scss']
})
export class KategorieDeleteDialogComponent implements OnInit, OnDestroy {

  private readonly subscriptions = new Subscription();

  public anzahlBuchungen = 0;

  private readonly urlBuchungen = `${AppConfigService.appConfig.apiServer.url}Buchung/GetBuchungenByKategorie`;

  constructor(
    private readonly httpClient: HttpClient,
    public dialogRef: MatDialogRef<KategorieDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Kategorie
  ) { }

  private loadBuchungen() {
    return this.httpClient.get(`${this.urlBuchungen}/${this.data.id}`)
      .pipe(
        tap((buchungen: Buchung[]) => this.anzahlBuchungen = buchungen.length)
      );
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.loadBuchungen().subscribe());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
