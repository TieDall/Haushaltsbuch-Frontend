import { BaseModel } from './base-model';

export class Kategorie extends BaseModel {
  bezeichnung: string;
  isEinnahme: boolean;
  icon: string;
}
