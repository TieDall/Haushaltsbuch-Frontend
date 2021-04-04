import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWidgetEntwicklungVermoegenBilanzComponent } from './report-widget-entwicklung-vermoegen-bilanz.component';

describe('ReportWidgetEntwicklungVermoegenBilanzComponent', () => {
  let component: ReportWidgetEntwicklungVermoegenBilanzComponent;
  let fixture: ComponentFixture<ReportWidgetEntwicklungVermoegenBilanzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportWidgetEntwicklungVermoegenBilanzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWidgetEntwicklungVermoegenBilanzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
