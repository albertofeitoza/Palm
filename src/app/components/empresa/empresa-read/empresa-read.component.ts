import { Endereco } from './../../../models/endereco/modelEndereco';
import { Contato } from './../../../models/contato/modelContato';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa-read',
  templateUrl: './empresa-read.component.html',
  styleUrls: ['./empresa-read.component.css']
})
export class EmpresaReadComponent implements OnInit {

  displayedColumns = ['id','cnpj', 'inscricaoEstadual', 'inscricaoMunicipal','nomeFantasia', 'razaoSocial','action']  
  empresa: Empresa;
  contato : Contato;
  endereco : Endereco;

  constructor() { }



  ngOnInit(): void {
    
  }

}
