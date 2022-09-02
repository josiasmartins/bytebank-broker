import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, pluck, tap } from 'rxjs/operators'
import { Acao, AcoesAPI } from './modelo/acoes';

const API = "http://localhost:3000/acoes"

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   *  Promise 
   * 
   * @description
   * Toda operação que pode ser feita com promises, pode também ser feita com observables
   * 
   * Com observable é possível representar um único elemento ou uma coleção de 
   * elementos, enquanto promises representam apenas um elemento.
   * 
   * O observable é um tipo de objeto que representa um fluxo de 
   * informações no tempo, como, por exemplo, os eventos de digitação de um campo.
   */
  public getAcoes() {
    return this.httpClient.get<AcoesAPI>(API)
      .pipe(
        tap((value) => console.log(value)),
        // map((api) => api.payload),
        // outra forma de fazer com plump
        pluck('payload'),
        map((acoes) => acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB))));
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    }

    if (acaoA.codigo < acaoB.codigo) {
      return -1;
    }

    return 0;
  }
}
