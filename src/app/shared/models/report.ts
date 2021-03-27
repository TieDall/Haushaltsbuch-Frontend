import { BaseModel } from './base-model';
import { ReportRow } from './report-row';

export class Report extends BaseModel {
  bezeichnung: string;
  reportRows: ReportRow[];
}
