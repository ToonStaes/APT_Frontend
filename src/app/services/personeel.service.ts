import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personeel } from '../interfaces/personeel';

@Injectable({
  providedIn: 'root',
})
export class PersoneelService {
  url: String = 'https://edge-service-server-toonstaes.cloud.okteto.net/';
  constructor(private httpClient: HttpClient) {}

  getPersoneel(): Observable<Personeel[]> {
    return this.httpClient.get<Personeel[]>(this.url + 'personeel');
  }

  getKeukenPersoneel(): Observable<Personeel[]> {
    return this.httpClient.get<Personeel[]>(
      this.url + 'personeel/functie/keuken'
    );
  }

  getZaalPersoneel(): Observable<Personeel[]> {
    return this.httpClient.get<Personeel[]>(
      this.url + 'personeel/functie/zaal'
    );
  }

  getPersoneelslid(personeelsnummer: string): Observable<Personeel> {
    return this.httpClient.get<Personeel>(
      this.url + 'personeel/' + personeelsnummer
    );
  }
}
