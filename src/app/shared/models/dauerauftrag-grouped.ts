import { BaseModel } from './base-model';
import { Kategorie } from './kategorie';

export class DauerauftragGrouped extends BaseModel {
  bezeichnung: string;
  kategorie: Kategorie;
  currentBetrag: number;
  isAktiv: boolean;
  hasMehrfachAktive: boolean;
}
