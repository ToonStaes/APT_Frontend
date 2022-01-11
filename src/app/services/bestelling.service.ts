import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bestelling } from '../interfaces/bestelling';
import { PostBestelling } from '../interfaces/postBestelling';

@Injectable({
  providedIn: 'root',
})
export class BestellingService {
  url: String = 'https://edge-service-server-arnehus.cloud.okteto.net/';
  constructor(private httpClient: HttpClient) {}

  getBestellingen(): Observable<Bestelling[]> {
    return this.httpClient.get<Bestelling[]>(this.url + 'bestellingen');
  }

  getBestellingByBestelNummer(bestelNummer: string): Observable<Bestelling> {
    return this.httpClient.get<Bestelling>(
      this.url + 'bestellingen/' + bestelNummer
    );
  }

  postBestelling(bestelling: PostBestelling): Observable<Bestelling> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Bestelling>(
      this.url + 'bestellingen',
      bestelling,
      {
        headers: headers,
      }
    );
  }

  putBestelling(bestelling: PostBestelling): Observable<Bestelling> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Bestelling>(
      this.url + 'bestellingen',
      bestelling,
      { headers: headers }
    );
  }

  deleteBestelling(bestellingsNummer: string): Observable<Bestelling> {
    return this.httpClient.delete<Bestelling>(
      this.url + 'bestellingen/bestelnummer/' + bestellingsNummer
    );
  }
}
