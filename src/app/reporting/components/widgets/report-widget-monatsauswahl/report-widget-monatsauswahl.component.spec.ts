import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWidgetMonatsauswahlComponent } from './report-widget-monatsauswahl.component';

describe('ReportWidgetMonatsauswahlComponent', () => {
  let component: ReportWidgetMonatsauswahlComponent;
  let fixture: ComponentFixture<ReportWidgetMonatsauswahlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportWidgetMonatsauswahlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWidgetMonatsauswahlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
