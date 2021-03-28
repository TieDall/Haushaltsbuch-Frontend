import { Component, Input, OnInit } from '@angular/core';
import { ReportWidget } from 'src/app/shared/models/report-widget';

@Component({
  selector: 'app-report-widget-wrapper',
  templateUrl: './report-widget-wrapper.component.html',
  styleUrls: ['./report-widget-wrapper.component.scss']
})
export class ReportWidgetWrapperComponent implements OnInit {

  @Input() reportWidget: ReportWidget;

  constructor() { }

  ngOnInit(): void {
  }

}
