import { Router } from '@angular/router';
import { Componentes } from './../../../Negocio/Componentes';
import { Aplicacao } from './../../../Negocio/Aplicacao';
import { UtilService } from './../../../services/util.service';
import { Component, OnInit } from '@angular/core';
import { Agenda } from 'src/app/models/Agenda/modelAgenda';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { AgendaDto } from 'src/app/models/Agenda/modelRetornoAgenda';
import { MatDialog } from '@angular/material/dialog';
import { AgendaCreateComponent } from '../agenda-create/agenda-create.component';
import { Overlay } from '@angular/cdk/overlay';
import { AgendaUpdateComponent } from '../agenda-update/agenda-update.component';
import { AgendaDeleteComponent } from '../agenda-delete/agenda-delete.component';
import { TipoUsuario } from 'src/app/models/usuarios/enumUsuarios';


@Component({
  selector: 'app-agenda-read',
  templateUrl: './agenda-read.component.html',
  styleUrls: ['./agenda-read.component.css']
})
export class AgendaReadComponent implements OnInit {

  Colunas = ['id','DtCriacao', 'NomeAgenda','Funcionario','NomeEmpresa','NomeUnidade','NomeSala',
                      'substituicao','GrupoAgenda','vigenciaInicio','vigenciaFim','considerarFeriado','bloqueado','action']  
  agenda : AgendaDto[];

  constructor(
              public dialog: MatDialog,
              public overlay : Overlay,
              private utilService : UtilService,
              private _repAgenda : ServiceAllService<AgendaDto>,
              private _utilService : UtilService
             ) { }

  ngOnInit(): void {
    this.utilService.AtualizarMenu(Aplicacao.Agenda,'app_registration','');
    this.buscarAgenda();
  }

 
  buscarAgenda(){
    
    let filtroAgenda = (<HTMLSelectElement>document.getElementById('busca')).value;

    this._repAgenda.read(Endpoint.Agenda).subscribe(ag => {
      this.agenda = filtroAgenda == null ? ag.filter(x => x.empresaId.toString() == this.utilService.Sessao().IdEmpresa) 
                    :  ag.filter(x => x.nomeAgenda.toLowerCase().includes(filtroAgenda.toLowerCase()) && x.empresaId.toString() == this.utilService.Sessao().IdEmpresa)
    });
  }

  addNovaAgenda(): void {
   
    if(this._utilService.Sessao().GrupoUsuario == TipoUsuario.Master || this._utilService.Sessao().GrupoUsuario == TipoUsuario.Administrador)
    {
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        const dialogRef = this.dialog.open(AgendaCreateComponent, {
          width : '700px',
          height : '900px',
          scrollStrategy
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    }else{
      this._utilService.showMessage("Solicitar ao um Usuário Master para criar Nova Agenda!",true);
    }
  }

  AtualizarAgenda(id : string): void {
    if(this._utilService.Sessao().GrupoUsuario == TipoUsuario.Master || this._utilService.Sessao().GrupoUsuario == TipoUsuario.Administrador)
    {
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        const dialogRef = this.dialog.open(AgendaUpdateComponent , {
          width : '30%',
          height : '80%',
          scrollStrategy,
          id
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }else{
        this._utilService.showMessage("Solicitar ao um Usuário Master para Editar os  dados da Agenda!",true);
      }   
  }

  ExcluirAgenda(id : string): void {
      if(this._utilService.Sessao().GrupoUsuario == TipoUsuario.Master || this._utilService.Sessao().GrupoUsuario == TipoUsuario.Administrador)
      {
          const scrollStrategy = this.overlay.scrollStrategies.reposition();
          const dialogRef = this.dialog.open(AgendaDeleteComponent , {
            width : '30%',
            height : '25%',
            scrollStrategy,
            id,
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
    }else{
      this._utilService.showMessage("Solicitar ao um Usuário Master para Excluir a Agenda!",true);
    }
  }
}
