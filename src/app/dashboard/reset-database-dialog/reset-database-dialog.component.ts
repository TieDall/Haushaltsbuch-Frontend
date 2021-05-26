import { Component, OnInit } from '@angular/core';
import { SpinnerOverlayService } from 'src/app/shared/services/spinner-overlay.service';

@Component({
  selector: 'app-reset-database-dialog',
  templateUrl: './reset-database-dialog.component.html',
  styleUrls: ['./reset-database-dialog.component.scss']
})
export class ResetDatabaseDialogComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void {
  }

}
