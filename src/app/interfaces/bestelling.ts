import { Gerecht } from "./gerecht";
import { Personeel } from "./personeel";

export interface Bestelling {
  _id?: string;
  bestelNummer: string;
  personeelslid: Personeel;
  gerechten: Gerecht[];
  totaalprijs?: number;
}
