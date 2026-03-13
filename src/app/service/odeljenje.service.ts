import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Odeljenje } from '../model/odeljenje.model';

@Injectable()
export class OdeljenjeService {
  private readonly API_URL = 'http://localhost:8082/odeljenje/';
  dataChange: BehaviorSubject<Odeljenje[]> = new BehaviorSubject<Odeljenje[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllOdeljenje(): Observable<Odeljenje[]> {
    this.httpClient.get<Odeljenje[]>(this.API_URL).subscribe({
      next: (data) => { this.dataChange.next(data); },
      error: (error: HttpErrorResponse) => { console.log(error.name + ' ' + error.message); }
    });
    return this.dataChange.asObservable();
  }

  public addOdeljenje(odeljenje: Odeljenje): void {
    const { id, ...data } = odeljenje as any; this.httpClient.post(this.API_URL, data).subscribe();
  }

  public updateOdeljenje(odeljenje: Odeljenje): void {
    this.httpClient.put(this.API_URL + odeljenje.id, odeljenje).subscribe();
  }

  public deleteOdeljenje(odeljenje: Odeljenje): void {
    this.httpClient.delete(this.API_URL + odeljenje.id).subscribe();
  }
}
