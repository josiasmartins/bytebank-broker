import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAcoes() {
    return this.httpClient.get<any>('http://locahost:3000/acoes');
  }
}
