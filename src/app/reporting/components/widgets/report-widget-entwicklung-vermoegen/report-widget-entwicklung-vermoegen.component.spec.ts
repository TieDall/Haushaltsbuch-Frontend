import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWidgetEntwicklungVermoegenComponent } from './report-widget-entwicklung-vermoegen.component';

describe('ReportWidgetEntwicklungVermoegenComponent', () => {
  let component: ReportWidgetEntwicklungVermoegenComponent;
  let fixture: ComponentFixture<ReportWidgetEntwicklungVermoegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportWidgetEntwicklungVermoegenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWidgetEntwicklungVermoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
