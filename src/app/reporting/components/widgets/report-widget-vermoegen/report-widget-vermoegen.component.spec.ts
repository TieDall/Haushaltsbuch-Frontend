import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWidgetVermoegenComponent } from './report-widget-vermoegen.component';

describe('ReportWidgetVermoegenComponent', () => {
  let component: ReportWidgetVermoegenComponent;
  let fixture: ComponentFixture<ReportWidgetVermoegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportWidgetVermoegenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWidgetVermoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
