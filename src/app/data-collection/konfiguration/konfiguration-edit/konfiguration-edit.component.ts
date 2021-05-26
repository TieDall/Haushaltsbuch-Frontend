import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, Subscription } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { Konfiguration } from 'src/app/shared/models/konfiguration';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { SpinnerOverlayService } from 'src/app/shared/services/spinner-overlay.service';

@Component({
  selector: 'app-konfiguration-edit',
  templateUrl: './konfiguration-edit.component.html',
  styleUrls: ['./konfiguration-edit.component.scss']
})
export class KonfigurationEditComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Konfiguration`;

  public form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient,
    private readonly snackBar: MatSnackBar,
    private readonly spinnerOverlayService: SpinnerOverlayService,
    public dialogRef: MatDialogRef<KonfigurationEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Konfiguration
  ) {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      parameter: [
        {
          value: this.data?.parameter,
          disabled: true
        }
      ],
      wert: [
        {
          value: this.data?.wert,
          disabled: false
        }
      ]
    });
  }

  public save() {
    this.data.wert = this.form?.value?.wert;

    if (this.data?.id) {
      this.httpClient
        .put(this.url + '/' + this.data.id, this.data)
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
