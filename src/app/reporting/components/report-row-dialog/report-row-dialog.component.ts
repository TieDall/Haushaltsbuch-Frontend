import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report-row-dialog',
  templateUrl: './report-row-dialog.component.html',
  styleUrls: ['./report-row-dialog.component.scss']
})
export class ReportRowDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReportRowDialogComponent>
  ) {
    this.form = this.formBuilder.group({
      anzahl: 1
    });
  }

  public save() {
    this.dialogRef.close(this.form.get('anzahl').value);
  }

  public ngOnInit(): void {
  }

}
