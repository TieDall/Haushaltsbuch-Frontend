import { ReportWidget } from './report-widget';

export const ReportWidgetLabel = new Map<number, Map<string, string>>([
  [ReportWidget.monatsAusgaben, new Map<string, string>([
    ['displayGraph', 'boolean'],
    ['displayTable', 'boolean'],
    ['initFix', 'boolean'],
    ['initVar', 'boolean']
  ])],
  [ReportWidget.vermoegen, new Map<string, string>([
    ['includeRuecklagen', 'boolean']
  ])],
  [ReportWidget.entwicklungVermoegen, new Map<string, string>([
    ['includeRuecklagen', 'boolean']
  ])]
]);
