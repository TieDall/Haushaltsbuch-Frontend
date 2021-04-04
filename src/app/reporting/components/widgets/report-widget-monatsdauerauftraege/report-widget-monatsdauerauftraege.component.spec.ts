import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWidgetMonatsdauerauftraegeComponent } from './report-widget-monatsdauerauftraege.component';

describe('ReportWidgetMonatsdauerauftraegeComponent', () => {
  let component: ReportWidgetMonatsdauerauftraegeComponent;
  let fixture: ComponentFixture<ReportWidgetMonatsdauerauftraegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportWidgetMonatsdauerauftraegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWidgetMonatsdauerauftraegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
