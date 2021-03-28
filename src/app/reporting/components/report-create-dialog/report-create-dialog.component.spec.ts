import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCreateDialogComponent } from './report-create-dialog.component';

describe('ReportCreateDialogComponent', () => {
  let component: ReportCreateDialogComponent;
  let fixture: ComponentFixture<ReportCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
