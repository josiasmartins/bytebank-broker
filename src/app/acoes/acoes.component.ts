import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from './modelo/acoes';
import { AcoesService } from './acoes.service';
import { merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

const ESPERA_DIGITACAO = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {

  public acoesInput = new FormControl();
  public todaAcoes$ = this.acoesService.getAcoes().pipe(tap(() => console.log('fluxo inicial')), tap(console.log));
  public filtraPeloInput$ = this.acoesInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    tap(() => console.log('fluxo filtro')),
    tap(console.log),
    // filter: O operador filter faz com que o fluxo vá para o próximo passo somente se o retorno da função interna retorne verdadeiro
    filter((valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length),
    //distinctUntilChanged: operador distinctUntilChanged para avaliar se o termo é igual ao termo anterior, e assim não realizar a requisição
    distinctUntilChanged(),
    // switch: alterna o fluxo da digitação para o fluxo da requisição ao servidor utilizando o operador switchMap
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
  );
  // merger: unir fluxos de informações utilizando a função merge.
  public acoes$ = merge(this.todaAcoes$, this.filtraPeloInput$)

  constructor(
    private acoesService: AcoesService
  ) {}


  // public ngOnInit(): void {
  //   this.subscription = this.acoesService.getAcoes().subscribe((acoes) => {
  //     this.acoes = acoes;
  //   })
  // }

  // public ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
