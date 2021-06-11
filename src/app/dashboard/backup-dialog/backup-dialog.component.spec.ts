import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupDialogComponent } from './backup-dialog.component';

describe('BackupDialogComponent', () => {
  let component: BackupDialogComponent;
  let fixture: ComponentFixture<BackupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
