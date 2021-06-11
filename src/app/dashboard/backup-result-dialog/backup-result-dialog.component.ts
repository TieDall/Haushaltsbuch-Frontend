import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackupResult } from 'src/app/shared/models/backup-result';

@Component({
  selector: 'app-backup-result-dialog',
  templateUrl: './backup-result-dialog.component.html',
  styleUrls: ['./backup-result-dialog.component.scss']
})
export class BackupResultDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BackupResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BackupResult
  ) { }

  public ngOnInit(): void {
  }

}
