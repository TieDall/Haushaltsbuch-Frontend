import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetDatabaseDialogComponent } from './reset-database-dialog.component';

describe('ResetDatabaseDialogComponent', () => {
  let component: ResetDatabaseDialogComponent;
  let fixture: ComponentFixture<ResetDatabaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetDatabaseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetDatabaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
