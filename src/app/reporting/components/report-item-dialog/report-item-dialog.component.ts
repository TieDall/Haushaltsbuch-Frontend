import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportWidget } from 'src/app/shared/models/report-widget';

@Component({
  selector: 'app-report-item-dialog',
  templateUrl: './report-item-dialog.component.html',
  styleUrls: ['./report-item-dialog.component.scss']
})
export class ReportItemDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReportItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReportWidget
  ) { }

  public ngOnInit(): void {
  }

  public save(widget: number) {
    this.dialogRef.close(widget);
  }

  public close() {
    this.dialogRef.close(this.data);
  }

}
