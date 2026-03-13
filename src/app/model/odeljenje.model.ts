import { Bolnica } from './bolnica.model';

export class Odeljenje {
  id: number = 0;
  naziv: string = '';
  lokacija: string = '';
  bolnica: Bolnica = new Bolnica();
}
