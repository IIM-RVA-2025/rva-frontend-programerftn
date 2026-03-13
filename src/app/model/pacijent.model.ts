import { Odeljenje } from './odeljenje.model';
import { Dijagnoza } from './dijagnoza.model';

export class Pacijent {
  id: number = 0;
  ime: string = '';
  prezime: string = '';
  zdrOsiguranje: boolean = false;
  datumRodjenja: string = '';
  odeljenje: Odeljenje = new Odeljenje();
  dijagnoza: Dijagnoza = new Dijagnoza();
}
