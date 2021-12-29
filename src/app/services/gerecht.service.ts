import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gerecht } from '../interfaces/gerecht';

@Injectable({
  providedIn: 'root'
})
export class GerechtService {
  url: String = "http://localhost:3000"
  constructor(private httpClient: HttpClient) { }

  getGerechten(): Observable<Gerecht[]> {
    return this.httpClient.get<Gerecht[]>(this.url + "/gerechten")
  }
}
