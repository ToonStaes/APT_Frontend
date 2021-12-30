import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personeel } from '../interfaces/personeel';

@Injectable({
  providedIn: 'root',
})
export class PersoneelService {
  url: String = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  getPersoneel(): Observable<Personeel[]> {
    return this.httpClient.get<Personeel[]>(this.url + '/personeel');
  }

  getKeukenPersoneel(): Observable<Personeel[]> {
    return this.httpClient.get<Personeel[]>(
      this.url + '/personeel?functie=Keuken'
    );
  }

  getZaalPersoneel(): Observable<Personeel[]> {
    return this.httpClient.get<Personeel[]>(
      this.url + '/personeel?functie=Zaal'
    );
  }

  getPersoneelslid(personeelsnummer: string): Observable<Personeel> {
    return this.httpClient.get<Personeel>(
      this.url + '/personeel?personeelsnummer=' + personeelsnummer
    );
  }
}
