import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportItem } from 'src/app/shared/models/report-item';
import { ReportWidgetLabel } from 'src/app/shared/models/report-widget-labels';

@Component({
  selector: 'app-report-config-dialog',
  templateUrl: './report-config-dialog.component.html',
  styleUrls: ['./report-config-dialog.component.scss']
})
export class ReportConfigDialogComponent implements OnInit {

  public form: FormGroup;

  public items: { fieldName: string, fieldType: string }[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReportConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReportItem
  ) {
    this.initForm();
  }

  private initForm() {
    const reportWidgets = ReportWidgetLabel.get(this.data.reportWidget);

    let config;
    if (this.data.config) {
      config = JSON.parse(this.data.config);
    }

    this.form = this.formBuilder.group({});

    for (const item of reportWidgets.keys()) {
      const type = reportWidgets.get(item);

      this.form.addControl(item, new FormControl());
      if (config) {
        this.form.controls[item].setValue(config[item]);
      }

      this.items.push({ fieldName: item, fieldType: type });
    }

  }

  public save() {
    this.dialogRef.close(JSON.stringify(this.form.value));
  }

  public close() {
    this.dialogRef.close(this.data?.config);
  }

  public ngOnInit(): void {
  }

}
