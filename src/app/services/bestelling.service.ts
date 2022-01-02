import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bestelling } from '../interfaces/bestelling';

@Injectable({
  providedIn: 'root',
})
export class BestellingService {
  url: String = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  getBestellingen(): Observable<Bestelling[]> {
    return this.httpClient.get<Bestelling[]>(this.url + "/bestellingen")
  }

  getBestelling(bestellingsnummer: string): Observable<Bestelling>{
    return this.httpClient.get<Bestelling>(this.url + '/bestelling?bestelNummer=' + bestellingsnummer);
  }
}
