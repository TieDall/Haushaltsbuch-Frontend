import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRowDialogComponent } from './report-row-dialog.component';

describe('ReportRowDialogComponent', () => {
  let component: ReportRowDialogComponent;
  let fixture: ComponentFixture<ReportRowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRowDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
