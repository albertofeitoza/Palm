import { TipoUsuario } from './../../../models/usuarios/enumUsuarios';
import { Endpoint } from './../../../Negocio/Endpoint';
import { Router } from '@angular/router';
import { ServiceAllService } from './../../../services/service-all.service';
import { Endereco } from './../../../models/endereco/modelEndereco';
import { Contato } from './../../../models/contato/modelContato';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs/operators';
import { TipoUsuarioSistema } from 'src/app/models/usuarios/enumUsuarios';

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

  constructor(private router : Router,
              private serviceEmpresa : ServiceAllService<Empresa>
             ) { }

  ngOnInit(): void {
    
    this.buscarEmpresa();

  }

  buscarEmpresa(): void 
  {
    let filtroEmpresa = (<HTMLSelectElement>document.getElementById('busca')).value;
    let empId = localStorage.getItem("empId");
    let grpId = Number(localStorage.getItem("grpUs"));

    this.serviceEmpresa.read(Endpoint.Empresa).subscribe(empresa => {
      empresa = empresa;

      
      this.empresa =  new Array();

          if(grpId == TipoUsuario.Administrador)
          {
            empresa.forEach(element => {
            this.empresa.push(element)
             });
          }
          else
          {
            for (let index = 0; index < empresa.length; index++) {
              const element = empresa[index];
              if (element.empresaPai.toString() == empId)
                this.empresa.push(element)
            }

          }

      let empresaFIltrada = new Array();
      if (filtroEmpresa){
           
        for (let index = 0; index < this.empresa.length; index++) {
          const element = this.empresa[index];
            if (element.nomeFantasia.toLowerCase().includes(filtroEmpresa.toLowerCase()))
            empresaFIltrada.push(element);
        }
        this.empresa = new Array();
        this.empresa = empresaFIltrada;    
      }else{
        this.empresa = empresa;
      }


    })
  }

  navigateToEmpresaCreate() : void {
    this.router.navigate(['empresa/create'])
  }

}
  


      




