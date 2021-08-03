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
              private UtilService : UtilService,
              private route : Router,
              private _repAgenda : ServiceAllService<AgendaDto>
             ) { }

  ngOnInit(): void {
    this.UtilService.AtualizarMenu(Aplicacao.Agenda,'app_registration','');
    this.buscarAgenda();
  }

 
  buscarAgenda(){
    let filtroAgenda = (<HTMLSelectElement>document.getElementById('busca')).value;

    this._repAgenda.read(Endpoint.Agenda).subscribe(ag => {
      this.agenda = filtroAgenda == null ? ag :  ag.filter(x => x.nomeAgenda.toLowerCase().includes(filtroAgenda.toLowerCase()))
    
    });

  }

  addNovaAgenda(): void {
   const scrollStrategy = this.overlay.scrollStrategies.reposition();
   const dialogRef = this.dialog.open(AgendaCreateComponent, {
     width : '700px',
     height : '900px',
     scrollStrategy

     
   });

   dialogRef.afterClosed().subscribe(result => {
     console.log(`Dialog result: ${result}`);
   });
  
  }

  AtualizarAgenda(id : string): void {
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
    

  }

  ExcluirAgenda(id : string): void {
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
    

  }


}
