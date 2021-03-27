import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Buchung } from 'src/app/shared/models/buchung';
import { Kategorie } from 'src/app/shared/models/kategorie';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-buchung-edit',
  templateUrl: './buchung-edit.component.html',
  styleUrls: ['./buchung-edit.component.scss']
})
export class BuchungEditComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Buchung`;
  private readonly kategorieUrl = `${AppConfigService.appConfig.apiServer.url}Kategorie`;

  public form: FormGroup;
  public kategorienSelect: Kategorie[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient,
    public dialogRef: MatDialogRef<BuchungEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Buchung
  ) {
    this.initForm();
  }

  public typChanged(event: MatRadioChange) {
    this.form.get('kategorie').setValue(null);
    this.subscriptions.add(
      this.loadKategorien(event.value === 'einnahme')
        .subscribe());
  }

  private loadKategorien(isEinnahme: boolean): Observable<any> {
    return this.httpClient.get<Kategorie[]>(this.kategorieUrl)
      .pipe(
        tap((kategorien: Kategorie[]) => {
          this.kategorienSelect = kategorien
            .filter(kategorien => kategorien.isEinnahme === isEinnahme)
            .sort((a, b) => a.bezeichnung.localeCompare(b.bezeichnung));
        })
      );
  }

  private initForm() {
    this.form = this.formBuilder.group({
      bezeichnung: [
        {
          value: this.data?.bezeichnung,
          disabled: false
        }
      ],
      betrag: [
        {
          value: this.data?.betrag,
          disabled: false
        },
        {
          validators: [Validators.min(0.01)]
        }
      ],
      buchungstag: [
        {
          value: this.data?.buchungstag ?? moment().startOf('day').toDate(),
          disabled: false
        }
      ],
      typ: [
        {
          value: this.data?.isEinnahme ? 'einnahme' : 'ausgabe',
          disabled: false
        }
      ],
      kategorie: [
        {
          value: this.data?.kategorie,
          disabled: false
        }
      ]
    });
  }

  public compareKategorien(obj1: Buchung, obj2: Buchung) {
    if (obj1?.id === obj2?.id) {
      return true;
    }
    else {
      return false;
    }
  }

  public save() {
    if (!this.data) {
      this.data = new Buchung();
    }

    this.data.bezeichnung = this.form?.value?.bezeichnung;
    this.data.betrag = this.form?.value?.betrag;
    this.data.isEinnahme = this.form?.value?.typ === 'einnahme';
    this.data.kategorieId = this.form?.value?.kategorie?.id;
    this.data.buchungstag = moment(this.form?.value?.buchungstag).local().format() as any;

    if (this.data?.id) {
      this.httpClient
        .put(`${this.url}/${this.data.id}`, this.data)
        .subscribe(() => this.dialogRef.close());
    } else {
      this.httpClient
        .post(this.url, this.data)
        .subscribe(() => this.dialogRef.close());
    }
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.loadKategorien(this.data?.isEinnahme ?? false).subscribe()
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
