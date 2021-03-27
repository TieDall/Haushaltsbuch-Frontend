import { BaseModel } from './base-model';
import { Report } from './report';
import { ReportItem } from './report-item';

export class ReportRow extends BaseModel {
  position: number;

  reportId: number;
  report: Report;

  reportItems: ReportItem[];
}
