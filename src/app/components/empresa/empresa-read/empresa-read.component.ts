import { ServiceAllService } from './../../../services/service-all.service';
import { Endereco } from './../../../models/endereco/modelEndereco';
import { Contato } from './../../../models/contato/modelContato';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-empresa-read',
  templateUrl: './empresa-read.component.html',
  styleUrls: ['./empresa-read.component.css']
})
export class EmpresaReadComponent implements OnInit {

  
  empresa: Empresa[];
  empresas: Empresa[];
  contato : Contato;
  endereco : Endereco;
  displayedColumns = ['id','cnpj', 'razaoSocial','nomeFantasia','inscricaoEstadual','inscricaoMunicipal','action']  

  constructor(private serviceEmpresa : ServiceAllService<Empresa>
             ) { }

  ngOnInit(): void {
    
    this.buscarEmpresa();

  }

  buscarEmpresa(): void 
  {
    const tipo = `${"/Empresa"}`
    this.serviceEmpresa.read(tipo).subscribe(empresa => {
      this.empresa = empresa;
     
      
     
      let empId = Number(localStorage.getItem("empId"));
      let grpId = Number(localStorage.getItem("grpUs"));
    
        this.empresas = this.empresa;
        this.empresa =  new Array();

          if(grpId == 1)
          {
            this.empresas.forEach(element => {
            this.empresa.push(element)
             });
          }
          else
          {
            for (let index = 0; index < this.empresas.length; index++) {
              const element = this.empresas[index];
              if (element.empresaPai == empId)
                this.empresa.push(element)
            }

          }
    })
  }
}
  


      




