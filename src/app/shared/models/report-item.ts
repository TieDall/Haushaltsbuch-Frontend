import { BaseModel } from './base-model';
import { ReportRow } from './report-row';
import { ReportWidget } from './report-widget';

export class ReportItem extends BaseModel {
  position: number;

  reportRowId: number;
  reportRow: ReportRow;

  config: string;

  reportWidget: ReportWidget;
}
