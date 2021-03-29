import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../components/confirm-delete-dialog/confirm-delete-dialog.component';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeleteInterceptor implements HttpInterceptor {

  constructor(
    private readonly matDialog: MatDialog
  ) { }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method === 'DELETE') {
      return this.matDialog.open(ConfirmDeleteDialogComponent).afterClosed()
        .pipe(
          switchMap((result: boolean) => {
            if (result) {
              return next.handle(request);
            } else {
              return EMPTY;
            }
          })
        );
    }
    return next.handle(request);
  }
}
