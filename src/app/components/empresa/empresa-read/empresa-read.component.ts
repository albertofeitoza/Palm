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
import { MatDialog } from '@angular/material/dialog';
import { EmpresaCreateComponent } from '../empresa-create/empresa-create.component';
import { UtilService } from 'src/app/services/util.service';
import { Overlay } from '@angular/cdk/overlay';
import { EmpresaUpdateComponent } from '../empresa-update/empresa-update.component';
import { EmpresaDeleteComponent } from '../empresa-delete/empresa-delete.component';

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
  displayedColumns = ['id','cnpj', 'razaoSocial','nomeFantasia','inscricaoEstadual','inscricaoMunicipal','bloqueado','action']  

  constructor(private router : Router,
              private serviceEmpresa : ServiceAllService<Empresa>,
              public dialog : MatDialog,
              private _utilService : UtilService,
              private overlay : Overlay
             ) { }

  ngOnInit(): void {
    
    this.buscarEmpresa();

  }

  buscarEmpresa(): void 
  {
    let filtroEmpresa = (<HTMLSelectElement>document.getElementById('busca')).value;
    let empId = localStorage.getItem("empId");
    let grpId = Number(localStorage.getItem("grpUs"));

    this.serviceEmpresa.read(Endpoint.Empresa).subscribe(emp => {
      emp = emp;

      
      this.empresa =  new Array();

          if(grpId == TipoUsuario.Administrador)
          {
            emp.forEach(element => {
            this.empresa.push(element)
             });
          }
          else if(grpId == TipoUsuario.Master)
          {
            emp.forEach(master => {
              if(master.empresaPai.toString()== empId) 
              this.empresa.push(master)
            });

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
        this.empresa = this.empresa;
      }


    })
  }

  addEmpresa(){

    if(this._utilService.Sessao().GrupoUsuario == TipoUsuario.Master || this._utilService.Sessao().GrupoUsuario == TipoUsuario.Administrador)
    {
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        const dialogRef = this.dialog.open(EmpresaCreateComponent, {
          width : '700px',
          height : '730px',
          scrollStrategy

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    }else{
      this._utilService.showMessage("Você não possui permissão para criação de empresas",true);
    }

  }


  editarEmpresa(id : string){

    if(this._utilService.Sessao().GrupoUsuario == TipoUsuario.Master || this._utilService.Sessao().GrupoUsuario == TipoUsuario.Administrador)
    {
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        const dialogRef = this.dialog.open(EmpresaUpdateComponent, {
          width : '700px',
          height : '750px',
          scrollStrategy,
          id

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    }else{
      this._utilService.showMessage("Você não possui permissão para criação de empresas",true);
    }

  }



  excluirEmpresa(id : string){

    if(this._utilService.Sessao().GrupoUsuario == TipoUsuario.Master || this._utilService.Sessao().GrupoUsuario == TipoUsuario.Administrador)
    {
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        const dialogRef = this.dialog.open(EmpresaDeleteComponent, {
          width : '500',
          height : '350px',
          scrollStrategy,
          id

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    }else{
      this._utilService.showMessage("Você não possui permissão para criação de empresas",true);
    }
    



  }

}
  


      




