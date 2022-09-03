import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from './modelo/acoes';
import { AcoesService } from './acoes.service';
import { merge, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {

  public acoesInput = new FormControl();
  public todaAcoes$ = this.acoesService.getAcoes().pipe(tap(() => console.log('fluxo inicial')), tap(console.log));
  public filtraPeloInput$ = this.acoesInput.valueChanges.pipe(
    tap(() => console.log('fluxo filtro')),
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
  );
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
