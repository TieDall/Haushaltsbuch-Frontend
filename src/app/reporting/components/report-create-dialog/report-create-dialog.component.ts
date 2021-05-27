import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { SpinnerOverlayService } from 'src/app/shared/services/spinner-overlay.service';

@Component({
  selector: 'app-report-create-dialog',
  templateUrl: './report-create-dialog.component.html',
  styleUrls: ['./report-create-dialog.component.scss']
})
export class ReportCreateDialogComponent implements OnInit, OnDestroy {

  private readonly subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Report`;

  public form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient,
    private readonly snackBar: MatSnackBar,
    private readonly spinnerOverlayService: SpinnerOverlayService,
    public dialogRef: MatDialogRef<ReportCreateDialogComponent>
  ) {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      bezeichnung: []
    });
  }

  public save() {
    this.spinnerOverlayService.show();
    this.subscriptions.add(
      this.httpClient
        .post(`${this.url}/${this.form.value.bezeichnung}`, null)
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
        }));
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
