import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BuchungEditComponent } from 'src/app/data-collection/buchung/buchung-edit/buchung-edit.component';
import { BackendService } from '../../services/backend.service';
import { BtnBuchungService } from '../../services/btn-buchung.service';

@Component({
  selector: 'app-btn-buchung',
  templateUrl: './btn-buchung.component.html',
  styleUrls: ['./btn-buchung.component.scss']
})
export class BtnBuchungComponent implements OnInit, OnDestroy {

  private readonly subscriptions = new Subscription();

  public disableButton = true;

  constructor(
    private readonly dialog: MatDialog,
    private readonly btnBuchungService: BtnBuchungService,
    private readonly backendService: BackendService
  ) { }

  public openDialog() {
    this.subscriptions.add(
      this.dialog
        .open(
          BuchungEditComponent,
          {
            width: '500px',
            disableClose: true
          })
        .afterClosed()
        .pipe(
          tap(() => this.btnBuchungService.subject.next(true))
        )
        .subscribe());
  }

  public ngOnInit(): void {
    this.backendService.backendReachable.subscribe((x: boolean) => {
      this.disableButton = !x;
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
