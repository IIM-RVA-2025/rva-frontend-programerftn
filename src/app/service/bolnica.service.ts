import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bolnica } from '../model/bolnica.model';

@Injectable()
export class BolnicaService {
  private readonly API_URL = 'http://localhost:8082/bolnica/';
  dataChange: BehaviorSubject<Bolnica[]> = new BehaviorSubject<Bolnica[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllBolnica(): Observable<Bolnica[]> {
    this.httpClient.get<Bolnica[]>(this.API_URL).subscribe({
      next: (data) => { this.dataChange.next(data); },
      error: (error: HttpErrorResponse) => { console.log(error.name + ' ' + error.message); }
    });
    return this.dataChange.asObservable();
  }

  public addBolnica(bolnica: Bolnica): void {
    const { id, ...data } = bolnica as any; this.httpClient.post(this.API_URL, data).subscribe();
  }

  public updateBolnica(bolnica: Bolnica): void {
    this.httpClient.put(this.API_URL + bolnica.id, bolnica).subscribe();
  }

  public deleteBolnica(bolnica: Bolnica): void {
    this.httpClient.delete(this.API_URL + bolnica.id).subscribe();
  }
}
