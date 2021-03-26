import { BaseModel } from './base-model';
import { Kategorie } from './kategorie';

export class Buchung extends BaseModel {
  bezeichnung: string;
  betrag: number;
  buchungstag: Date;
  isEinnahme: boolean;

  kategorie: Kategorie;
  kategorieId: number;
}
