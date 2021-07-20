import { Router } from '@angular/router';
import { Componentes } from './../../../Negocio/Componentes';
import { Aplicacao } from './../../../Negocio/Aplicacao';
import { UtilService } from './../../../services/util.service';
import { Component, OnInit } from '@angular/core';
import { Agenda } from 'src/app/models/Agenda/modelAgenda';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { AgendaDto } from 'src/app/models/Agenda/modelRetornoAgenda';


@Component({
  selector: 'app-agenda-read',
  templateUrl: './agenda-read.component.html',
  styleUrls: ['./agenda-read.component.css']
})
export class AgendaReadComponent implements OnInit {

  Colunas = ['id','DtCriacao', 'NomeAgenda','Funcionario','NomeEmpresa','NomeUnidade','NomeSala',
                      'substituicao','GrupoAgenda','vigenciaInico','vigenciaFim','considerarFeriado','bloqueado','action']  
  agenda : AgendaDto[];

  constructor(private UtilService : UtilService,
              private route : Router,
              private _repAgenda : ServiceAllService<AgendaDto>
             ) { }

  ngOnInit(): void {
    this.UtilService.AtualizarMenu(Aplicacao.Agenda,'app_registration','');
    this.buscarAgenda();
  }

 
  buscarAgenda(){
    
    this._repAgenda.read(Endpoint.Agenda).subscribe(ag => {
      this.agenda = ag;

    });

  }

  LimparAgenda(){
    this.agenda = new Array();
  }

}
