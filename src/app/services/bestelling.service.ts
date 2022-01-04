import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bestelling } from '../interfaces/bestelling';

@Injectable({
  providedIn: 'root',
})
export class BestellingService {
  url: String = 'https://edge-service-server-toonstaes.cloud.okteto.net/';
  constructor(private httpClient: HttpClient) {}

  getBestellingen(): Observable<Bestelling[]> {
    return this.httpClient.get<Bestelling[]>(this.url + 'bestellingen');
  }

  getBestellingByBestelNummer(bestelNummer: string): Observable<Bestelling> {
    return this.httpClient.get<Bestelling>(
      this.url + 'bestellingen/' + bestelNummer
    );
  }
}
