import { BaseModel } from './base-model';

export class Gutschein extends BaseModel {
  bezeichnung: string;
  betrag: number;
  ablaufdatum: Date;
  bemerkung: string;
}
