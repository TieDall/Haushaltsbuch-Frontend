import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWidgetMonatsbilanzComponent } from './report-widget-monatsbilanz.component';

describe('ReportWidgetMonatsbilanzComponent', () => {
  let component: ReportWidgetMonatsbilanzComponent;
  let fixture: ComponentFixture<ReportWidgetMonatsbilanzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportWidgetMonatsbilanzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWidgetMonatsbilanzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
