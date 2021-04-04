import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWidgetEntwicklungBilanzComponent } from './report-widget-entwicklung-bilanz.component';

describe('ReportWidgetEntwicklungBilanzComponent', () => {
  let component: ReportWidgetEntwicklungBilanzComponent;
  let fixture: ComponentFixture<ReportWidgetEntwicklungBilanzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportWidgetEntwicklungBilanzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWidgetEntwicklungBilanzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
