import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Ruecklage } from 'src/app/shared/models/ruecklage';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-ruecklage-edit',
  templateUrl: './ruecklage-edit.component.html',
  styleUrls: ['./ruecklage-edit.component.scss']
})
export class RuecklageEditComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Ruecklage`;

  public form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient,
    public dialogRef: MatDialogRef<RuecklageEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ruecklage
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
          value: this.data?.summe,
          disabled: false
        }
      ]
    });
  }

  public save() {
    if (!this.data) {
      this.data = new Ruecklage();
    }

    this.data.bezeichnung = this.form?.value?.bezeichnung;
    this.data.summe = this.form?.value?.betrag;

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
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
