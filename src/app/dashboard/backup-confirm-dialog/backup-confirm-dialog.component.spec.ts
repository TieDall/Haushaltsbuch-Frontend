import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupConfirmDialogComponent } from './backup-confirm-dialog.component';

describe('BackupConfirmDialogComponent', () => {
  let component: BackupConfirmDialogComponent;
  let fixture: ComponentFixture<BackupConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackupConfirmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
