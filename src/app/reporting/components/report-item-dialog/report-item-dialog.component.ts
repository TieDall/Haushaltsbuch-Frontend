import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report-item-dialog',
  templateUrl: './report-item-dialog.component.html',
  styleUrls: ['./report-item-dialog.component.scss']
})
export class ReportItemDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReportItemDialogComponent>
  ) { }

  public ngOnInit(): void {
  }

  public save(widget: number) {
    this.dialogRef.close(widget);
  }

}
