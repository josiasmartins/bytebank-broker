import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = "http://localhost:3000/acoes"

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAcoes() {
    return this.httpClient.get<any>(API);
  }
}
