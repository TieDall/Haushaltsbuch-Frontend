import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-backup-dialog',
  templateUrl: './backup-dialog.component.html',
  styleUrls: ['./backup-dialog.component.scss']
})
export class BackupDialogComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Backup`;

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public export() {
    this.subscriptions.add(
      this.httpClient.get<Blob>(`${this.url}/Export`, {
        observe: 'response',
        responseType: 'blob' as 'json'
      }).subscribe((resp: HttpResponse<Blob>) => {

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
    const file: File = event.target.files[0];

    if (file) {
        const fileName = file.name;
        const formData = new FormData();
        formData.append('file', file);

        this.subscriptions.add(this.httpClient.post(`${this.url}/Import`, formData).subscribe());
    }
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
