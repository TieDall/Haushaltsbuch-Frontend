import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Dauerauftrag } from 'src/app/shared/models/dauerauftrag';
import { Intervall } from 'src/app/shared/models/intervall';
import { IntervallLabel } from 'src/app/shared/models/intervall-labels';
import { Kategorie } from 'src/app/shared/models/kategorie';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-dauerauftrag-edit',
  templateUrl: './dauerauftrag-edit.component.html',
  styleUrls: ['./dauerauftrag-edit.component.scss']
})
export class DauerauftragEditComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Dauerauftrag`;
  private readonly kategorieUrl = `${AppConfigService.appConfig.apiServer.url}Kategorie`;

  public form: FormGroup;

  public kategorienSelect: Kategorie[] = [];
  public intervallSelect = [
    {
      value: Intervall.monatlich,
      display: IntervallLabel.get(Intervall.monatlich)
    },
    {
      value: Intervall.quartalsweise,
      display: IntervallLabel.get(Intervall.quartalsweise)
    },
    {
      value: Intervall.jaehrlich,
      display: IntervallLabel.get(Intervall.jaehrlich)
    }
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient,
    public dialogRef: MatDialogRef<DauerauftragEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dauerauftrag
  ) {
    this.initForm();
  }

  public typChanged(event: MatRadioChange) {
    console.log(this.form);
    this.form.get('kategorie').setValue(null);
    this.subscriptions.add(
      this.loadKategorien(event.value === 'einnahme')
        .subscribe());
  }

  private loadKategorien(isEinnahme: boolean): Observable<Kategorie[]> {
    return this.httpClient.get<Kategorie[]>(this.kategorieUrl)
      .pipe(
        tap((kategorien: Kategorie[]) => {
          this.kategorienSelect = kategorien
            .filter((kategorie: Kategorie) => kategorie.isEinnahme === isEinnahme)
            .sort((a, b) => a.bezeichnung.localeCompare(b.bezeichnung));
        })
      );
  }

  public compareKategorien(obj1: Dauerauftrag, obj2: Dauerauftrag) {
    if (obj1?.id === obj2?.id) {
      return true;
    }
    else {
      return false;
    }
  }

  public compareIntervall(obj1: any, obj2: any) {
    if (obj1 === obj2) {
      return true;
    }
    else {
      return false;
    }
  }

  public save() {
    if (!this.data || this.data.id === 0) {
      this.data = new Dauerauftrag();
    }

    this.data.bezeichnung = this.form?.value?.bezeichnung;
    this.data.betrag = this.form?.value?.betrag;
    this.data.isEinnahme = this.form?.value?.typ === 'einnahme';
    this.data.intervall = this.form?.value?.intervall;
    this.data.beginn =
      this.form?.value?.beginn ?
        moment(this.form?.value?.beginn).local().format() as any :
        null;
    this.data.ende =
      this.form?.value?.ende ?
        moment(this.form?.value?.ende).local().format() as any :
        null;
    this.data.kategorieId = this.form?.value?.kategorie?.id;

    if (this.data?.id) {
      this.httpClient
        .put(this.url + '/' + this.data.id, this.data)
        .subscribe(() => this.dialogRef.close());
    } else {
      this.httpClient
        .post(this.url, this.data)
        .subscribe(() => this.dialogRef.close());
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      bezeichnung: [
        {
          value: this?.data?.bezeichnung,
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
      typ: [
        {
          value: this?.data?.isEinnahme ? 'einnahme' : 'ausgabe',
          disabled: false
        }
      ],
      kategorie: [
        {
          value: this.data?.kategorie,
          disabled: false
        }
      ],
      intervall: [
        {
          value: this.data?.intervall,
          disabled: false
        }
      ],
      beginn: [
        {
          value: this.data?.beginn,
          disabled: false
        }
      ],
      ende: [
        {
          value: this.data?.ende,
          disabled: false
        }
      ]
    });
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
