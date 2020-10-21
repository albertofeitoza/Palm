import { ServiceAllService } from './../../../services/service-all.service';
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

  
  empresa: Empresa[];
  contato : Contato;
  endereco : Endereco;
  displayedColumns = ['id','cnpj', 'razaoSocial','nomeFantasia','inscricaoEstadual','inscricaoMunicipal','action']  

  constructor(private serviceEmpresa : ServiceAllService<Empresa>
             ) { }

  ngOnInit(): void {
    
    this.buscarEmpresa();

  }

  buscarEmpresa(): void {
    const tipo = `${"/Empresa"}`
    this.serviceEmpresa.read(tipo).subscribe(empresa => {
      this.empresa = empresa;

  })
  }

}
