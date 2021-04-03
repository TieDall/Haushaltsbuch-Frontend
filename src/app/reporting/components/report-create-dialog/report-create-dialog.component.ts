import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

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
    this.subscriptions.add(
      this.httpClient
        .post(`${this.url}/${this.form.value.bezeichnung}`, null)
        .subscribe(() => this.dialogRef.close()));
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
