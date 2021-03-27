import { BaseModel } from './base-model';
import { Intervall } from './intervall';
import { Kategorie } from './kategorie';

export class Dauerauftrag extends BaseModel {
  bezeichnung: string;
  betrag: number;
  isEinnahme: boolean;
  intervall: Intervall;
  beginn: Date;
  ende: Date;

  kategorie: Kategorie;
  kategorieId: number;
}
