import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of, Subscription } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { BackupResult } from 'src/app/shared/models/backup-result';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { SpinnerOverlayService } from 'src/app/shared/services/spinner-overlay.service';
import { BackupConfirmDialogComponent } from '../backup-confirm-dialog/backup-confirm-dialog.component';
import { BackupResultDialogComponent } from '../backup-result-dialog/backup-result-dialog.component';

@Component({
  selector: 'app-backup-dialog',
  templateUrl: './backup-dialog.component.html',
  styleUrls: ['./backup-dialog.component.scss']
})
export class BackupDialogComponent implements OnInit, OnDestroy {

  @ViewChild('fileUpload') fileUploadField: ElementRef;

  public subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Backup`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly dialog: MatDialog,
    private readonly spinnerOverlayService: SpinnerOverlayService
  ) { }

  public export() {
    this.spinnerOverlayService.show();
    this.subscriptions.add(
      this.httpClient.get<Blob>(`${this.url}/Export`, {
        observe: 'response',
        responseType: 'blob' as 'json'
      })
      .pipe(
        finalize(() => {
          this.fileUploadField.nativeElement.value = '';
          this.spinnerOverlayService.hide();
        })
      )
      .subscribe((resp: HttpResponse<Blob>) => {

        let fileName = resp.headers.get('content-disposition');
        const positionFilenameStart = fileName.indexOf('filename=');
        fileName = fileName.substr(positionFilenameStart + 9, fileName.length);
        const positionFilenameEnd = fileName.indexOf(';');
        fileName = fileName.substring(0, positionFilenameEnd);

        const binaryData = [];
        binaryData.push(resp.body);
        const data = window.URL.createObjectURL(new Blob(binaryData));
        const link = document.createElement('a');
        link.href = data;
        link.download = fileName;
        link.click();
      })
    );
  }

  public onFileSelected(event) {
    this.spinnerOverlayService.show();
    const file: File = event.target.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        this.subscriptions.add(
          this.dialog.open(BackupConfirmDialogComponent).afterClosed()
            .pipe(
              switchMap((continueImport: boolean) => continueImport ? this.httpClient.post(`${this.url}/Import`, formData) : of([])),
              finalize(() => {
                this.fileUploadField.nativeElement.value = '';
                this.spinnerOverlayService.hide();
              })
            )
            .subscribe((backupResult: BackupResult) => {
              this.dialog.open(BackupResultDialogComponent, {data: backupResult}).afterClosed().subscribe();
            }));
    }
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
