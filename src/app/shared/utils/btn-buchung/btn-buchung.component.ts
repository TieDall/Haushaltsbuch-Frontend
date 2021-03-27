import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BuchungEditComponent } from 'src/app/data-collection/buchung/buchung-edit/buchung-edit.component';

@Component({
  selector: 'app-btn-buchung',
  templateUrl: './btn-buchung.component.html',
  styleUrls: ['./btn-buchung.component.scss']
})
export class BtnBuchungComponent implements OnInit, OnDestroy {

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly dialog: MatDialog
  ) { }

  public openDialog() {
    this.subscriptions.add(
      this.dialog
        .open(
          BuchungEditComponent,
          {
            width: '500px'
          })
        .afterClosed()
        .subscribe());
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
