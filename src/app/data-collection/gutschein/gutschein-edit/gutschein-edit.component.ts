import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { of, Subscription } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { Gutschein } from 'src/app/shared/models/gutschein';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { SpinnerOverlayService } from 'src/app/shared/services/spinner-overlay.service';

@Component({
  selector: 'app-gutschein-edit',
  templateUrl: './gutschein-edit.component.html',
  styleUrls: ['./gutschein-edit.component.scss']
})
export class GutscheinEditComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Gutschein`;

  public form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient,
    private readonly snackBar: MatSnackBar,
    private readonly spinnerOverlayService: SpinnerOverlayService,
    public dialogRef: MatDialogRef<GutscheinEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Gutschein
  ) {
    this.initForm();
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
        }
      ],
      ablaufdatum: [
        {
          value: this.data?.ablaufdatum,
          disabled: false
        }
      ],
      bemerkung: [
        {
          value: this.data?.bemerkung,
          disabled: false
        }
      ]
    });
  }

  public save() {
    this.spinnerOverlayService.show();

    if (!this.data) {
      this.data = new Gutschein();
    }

    this.data.bezeichnung = this.form?.value?.bezeichnung;
    this.data.betrag = this.form?.value?.betrag;
    this.data.ablaufdatum = this.form?.value?.ablaufdatum;
    this.data.bemerkung = this.form?.value?.bemerkung;

    if (this.data?.id) {
      this.httpClient
        .put(`${this.url}/${this.data.id}`, this.data)
        .pipe(
          map(() => true),
          catchError(() => of(false)),
          finalize(() => this.spinnerOverlayService.hide())
        )
        .subscribe((isSuccess: boolean) => {
          if (isSuccess) {
            this.snackBar.open('Speichern erfolgreich.', 'Ok', {duration: 2000});
            this.dialogRef.close();
          } else {
            this.snackBar.open('Speichern fehlgeschlagen.', 'Ok', {duration: 2000});
          }
        });
    } else {
      this.httpClient
        .post(this.url, this.data)
        .pipe(
          map(() => true),
          catchError(() => of(false)),
          finalize(() => this.spinnerOverlayService.hide())
        )
        .subscribe((isSuccess: boolean) => {
          if (isSuccess) {
            this.snackBar.open('Speichern erfolgreich.', 'Ok', {duration: 2000});
            this.dialogRef.close();
          } else {
            this.snackBar.open('Speichern fehlgeschlagen.', 'Ok', {duration: 2000});
          }
        });
    }
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
