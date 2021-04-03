import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStopEditingDialogComponent } from './report-stop-editing-dialog.component';

describe('ReportStopEditingDialogComponent', () => {
  let component: ReportStopEditingDialogComponent;
  let fixture: ComponentFixture<ReportStopEditingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportStopEditingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStopEditingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
