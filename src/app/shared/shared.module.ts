import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnBuchungComponent } from './utils/btn-buchung/btn-buchung.component';
import { MaterialModule } from '../material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DeleteInterceptor } from './interceptor/delete.interceptor';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { BackendComponent } from './components/backend/backend.component';
import { BackendInterceptor } from './interceptor/backend.interceptor';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';



@NgModule({
  declarations: [
    BtnBuchungComponent,
    ConfirmDeleteDialogComponent,
    BackendComponent,
    SpinnerOverlayComponent
  ],
  exports: [
    BtnBuchungComponent,
    BackendComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DeleteInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
