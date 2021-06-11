import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupResultDialogComponent } from './backup-result-dialog.component';

describe('BackupResultDialogComponent', () => {
  let component: BackupResultDialogComponent;
  let fixture: ComponentFixture<BackupResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackupResultDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
