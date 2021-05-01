import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BackendService } from '../services/backend.service';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

  constructor(
    private readonly backendService: BackendService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('app-config.json')) {
      return next
        .handle(request)
        .pipe(tap(
          (response: HttpEvent<any>) => {
          },
          (error: HttpErrorResponse) => {
            this.backendService.backendReachable.next(false);
          },
          () => {
            this.backendService.backendReachable.next(true);
          }
        ));
    }

    return next.handle(request);
  }
}
