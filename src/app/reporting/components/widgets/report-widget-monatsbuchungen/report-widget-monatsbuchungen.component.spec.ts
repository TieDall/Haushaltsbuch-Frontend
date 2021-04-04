import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWidgetMonatsbuchungenComponent } from './report-widget-monatsbuchungen.component';

describe('ReportWidgetMonatsbuchungenComponent', () => {
  let component: ReportWidgetMonatsbuchungenComponent;
  let fixture: ComponentFixture<ReportWidgetMonatsbuchungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportWidgetMonatsbuchungenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWidgetMonatsbuchungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
