import { Component, OnInit } from '@angular/core';
import { Contato } from 'src/app/models/contato/modelContato';

@Component({
  selector: 'app-pessoa-contatos',
  templateUrl: './pessoa-contatos.component.html'
})
export class PessoaContatosComponent implements OnInit {

  constructor() { }
 contato : Contato[]

  ngOnInit(): void {
  }



}
