import { TipoUsuario } from './../../../models/usuarios/enumUsuarios';
import { Endpoint } from './../../../Negocio/Endpoint';
import { Router } from '@angular/router';
import { ServiceAllService } from './../../../services/service-all.service';
import { Endereco } from './../../../models/endereco/modelEndereco';
import { Contato } from './../../../models/contato/modelContato';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Component, OnInit, Input } from '@angular/core';
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

 empresa: Empresa[]
 empresas: Empresa[]
 contato: Contato;
 endereco: Endereco;
  //Colunas do GRID
  displayedColumns = ['id','cnpj', 'razaoSocial','nomeFantasia','inscricaoEstadual','inscricaoMunicipal','bloqueado','action']  

  idSelecionado : Number =0;

  constructor(private router : Router,
              private serviceEmpresa : ServiceAllService<Empresa>,
              public dialog : MatDialog,
              private _utilService : UtilService,
              private overlay : Overlay
             ) { }

  ngOnInit(): void {
    
    this.buscarEmpresa();      ///revisitar esse método

  }

  selecionaLinha(id : Number)
  {
    this.idSelecionado = id
  }


  buscarEmpresa(): void 
  {
    let filtroEmpresa = (<HTMLSelectElement>document.getElementById('busca')).value;
      
      this.serviceEmpresa.read(Endpoint.Empresa).subscribe(emp => {
        this.empresa = filtroEmpresa != null ? emp.filter(x => x.nomeFantasia.toLowerCase().includes(filtroEmpresa.toLowerCase())) : emp
      })
    
  }

  addEmpresa(){

    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Master.toString() || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    {
      this._utilService.Popup("", EmpresaCreateComponent, '730px', '730px')
    }else{
      this._utilService.showMessage("Você não possui permissão para criação de empresas",true);
    }
  }


  editarEmpresa(id : string){

    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Master.toString() || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    {
      this._utilService.Popup(id, EmpresaUpdateComponent, "700px", "750px")
    }else{
      this._utilService.showMessage("Você não possui permissão para alterar cadastro de empresas",true);
    }

  }

  excluirEmpresa(id : string){

    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Master.toString() || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    {
      this._utilService.Popup(id, EmpresaDeleteComponent, "700px", "200px")
    }else{
      this._utilService.showMessage("Você não possui permissão para Excluir empresa",true);
    }
  }
}
  


      




