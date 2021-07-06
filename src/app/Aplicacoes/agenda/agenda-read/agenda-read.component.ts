import { Router } from '@angular/router';
import { Componentes } from './../../../Negocio/Componentes';
import { Aplicacao } from './../../../Negocio/Aplicacao';
import { UtilService } from './../../../services/util.service';
import { Component, OnInit } from '@angular/core';
import { Agenda } from 'src/app/models/Agenda/modelAgenda';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { Endpoint } from 'src/app/Negocio/Endpoint';


@Component({
  selector: 'app-agenda-read',
  templateUrl: './agenda-read.component.html',
  styleUrls: ['./agenda-read.component.css']
})
export class AgendaReadComponent implements OnInit {

  Colunas = ['id','DtCriacao', 'nomeAgenda','empresaid','unidadeid','salaid','profissionalid',
                      'substituicao','grupoAgendaid','vigenciaInico','vigenciaFim','considerarFeriado','ativo','action']  
  agenda : Agenda[];

  constructor(private UtilService : UtilService,
              private route : Router,
              private _repAgenda : ServiceAllService<Agenda>
             ) { }

  ngOnInit(): void {
    this.UtilService.AtualizarMenu(Aplicacao.Agenda,'app_registration','');
    this.buscarAgenda();
  }

 
  buscarAgenda(){
    
    this._repAgenda.read(Endpoint.Agenda).subscribe(ag => {
      ag = ag;
      
      this.agenda = new Array()
      this.agenda = ag;

    });

  }

  LimparAgenda(){
    this.agenda = new Array();
  }

}
