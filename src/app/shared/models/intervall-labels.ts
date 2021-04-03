import { Intervall } from './intervall';

export const IntervallLabel = new Map<number, string>([
  [Intervall.monatlich, 'monatlich'],
  [Intervall.quartalsweise, 'quartalsweise (drei-monatlich)'],
  [Intervall.jaehrlich, 'jährlich']
]);
