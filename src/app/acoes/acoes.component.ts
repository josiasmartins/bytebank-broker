import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from './modelo/acoes';
import { AcoesService } from './acoes.service';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent implements OnInit {

  public acoesInput = new FormControl();
  public acoes: Acoes;

  constructor(
    private acoesService: AcoesService
  ) {}


  public ngOnInit(): void {
    this.acoesService.getAcoes().subscribe((response) => {
      this.acoes = response.payload;
    })
  }
}
