import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Icon } from 'src/app/shared/models/icon';
import { SpinnerOverlayService } from 'src/app/shared/services/spinner-overlay.service';

@Component({
  selector: 'app-icon-select-dialog',
  templateUrl: './icon-select-dialog.component.html',
  styleUrls: ['./icon-select-dialog.component.scss']
})
export class IconSelectDialogComponent implements OnDestroy {

  public subscriptions = new Subscription();

  public icons: Icon[] = [];

  constructor(
    private readonly httpClient: HttpClient,
    private readonly spinnerOverlayService: SpinnerOverlayService,
    public dialogRef: MatDialogRef<IconSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Icon
  ) {
    this.spinnerOverlayService.show();
    this.subscriptions.add(this.loadIcons().subscribe());
  }

  private loadIcons() {
    return this.httpClient.get('assets/icons.json')
      .pipe(
        tap((fileContent: any) => {
          const icons = fileContent.icons as Icon[];
          this.icons = icons.sort((a, b) => b.popularity - a.popularity);
        }),
        finalize(() => this.spinnerOverlayService.hide())
      );
  }

  public close(icon: Icon) {
    this.dialogRef.close(icon.name);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
