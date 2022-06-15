import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pessoa } from 'src/app/models/Pessoa/modelPessoa';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  pessoa : Pessoa = new Pessoa()
  sexo : any[];
  estCivil : any[];
  constructor(
              private servico : UtilService,
              private dialofRef : MatDialogRef<PessoaComponent>,
              )
               { }

  ngOnInit(): void {
  this.carregaCombos()
  
  }
  

  fecharPopup(){
    this.dialofRef.close();
  }

  salvar(){

  }

  carregaCombos(){
    this.sexo = this.servico.Genero()
    this.estCivil = this.servico.EstCivil();
  }

}
