import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pacijent } from '../model/pacijent.model';

@Injectable()
export class PacijentService {
  private readonly API_URL = 'http://localhost:8082/pacijent/';
  dataChange: BehaviorSubject<Pacijent[]> = new BehaviorSubject<Pacijent[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllPacijent(): Observable<Pacijent[]> {
    this.httpClient.get<Pacijent[]>(this.API_URL).subscribe({
      next: (data) => { this.dataChange.next(data); },
      error: (error: HttpErrorResponse) => { console.log(error.name + ' ' + error.message); }
    });
    return this.dataChange.asObservable();
  }

  public addPacijent(pacijent: Pacijent): void {
    const { id, ...data } = pacijent as any; this.httpClient.post(this.API_URL, data).subscribe();
  }

  public updatePacijent(pacijent: Pacijent): void {
    this.httpClient.put(this.API_URL + pacijent.id, pacijent).subscribe();
  }

  public deletePacijent(pacijent: Pacijent): void {
    this.httpClient.delete(this.API_URL + pacijent.id).subscribe();
  }
}
