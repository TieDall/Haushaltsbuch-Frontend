import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportItemDialogComponent } from './report-item-dialog.component';

describe('ReportItemDialogComponent', () => {
  let component: ReportItemDialogComponent;
  let fixture: ComponentFixture<ReportItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportItemDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
