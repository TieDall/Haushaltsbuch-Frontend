import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWidgetWrapperComponent } from './report-widget-wrapper.component';

describe('ReportWidgetWrapperComponent', () => {
  let component: ReportWidgetWrapperComponent;
  let fixture: ComponentFixture<ReportWidgetWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportWidgetWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWidgetWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
