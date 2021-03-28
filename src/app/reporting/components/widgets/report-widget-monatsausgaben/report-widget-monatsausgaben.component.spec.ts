import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWidgetMonatsausgabenComponent } from './report-widget-monatsausgaben.component';

describe('ReportWidgetMonatsausgabenComponent', () => {
  let component: ReportWidgetMonatsausgabenComponent;
  let fixture: ComponentFixture<ReportWidgetMonatsausgabenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportWidgetMonatsausgabenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWidgetMonatsausgabenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
