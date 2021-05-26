import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, Subscription } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { Kategorie } from 'src/app/shared/models/kategorie';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { SpinnerOverlayService } from 'src/app/shared/services/spinner-overlay.service';

@Component({
  selector: 'app-kategorie-edit',
  templateUrl: './kategorie-edit.component.html',
  styleUrls: ['./kategorie-edit.component.scss']
})
export class KategorieEditComponent implements OnInit, OnDestroy {

  private readonly subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Kategorie`;

  public form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient,
    private readonly snackBar: MatSnackBar,
    private readonly spinnerOverlayService: SpinnerOverlayService,
    public dialogRef: MatDialogRef<KategorieEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Kategorie
  ) {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      bezeichnung: [
        {
          value: this?.data?.bezeichnung,
          disabled: false
        }
      ],
      typ: [
        {
          value: this?.data?.isEinnahme ? 'einnahme' : 'ausgabe',
          disabled: false
        }
      ],
      icon: [
        {
          value: this?.data?.icon,
          disabled: false
        }
      ]
    });
  }

  public save() {
    this.spinnerOverlayService.show();

    if (!this.data) {
      this.data = new Kategorie();
    }
    this.data.bezeichnung = this.form?.value?.bezeichnung;
    this.data.isEinnahme = this.form?.value?.typ === 'einnahme';
    this.data.icon = this.form?.value?.icon;

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
