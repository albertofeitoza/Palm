import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Aplicacao } from './../../../Negocio/Aplicacao';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Agenda } from 'src/app/models/Agenda/modelAgenda';

@Component({
  selector: 'app-agenda-create',
  templateUrl: './agenda-create.component.html',
  styleUrls: ['./agenda-create.component.css']
})
export class AgendaCreateComponent implements OnInit {

  agenda : Agenda = {
    DtCriacao: null, 
    nomeAgenda: null,
    empresaid: null,
    unidadeid: null,
    salaid: null,
    profissionalid: null,
    substituicao: null,
    grupoAgendaid: null,
    vigenciaInico: null,
    vigenciaFim: null,
    considerarFeriado: null,
    ativo: null
  }

  agendaReader : boolean = false;
  empresa : Empresa[];

  formulario : FormGroup;


  constructor(private route : Router,
              private formBuilder : FormBuilder,
              private serviceEmpresa : ServiceAllService<Empresa>
    ) { }



  ngOnInit(): void {
     this.carregaCombos()
  }

  createAgenda(){
    this.agendaReader = true
    this.route.navigate(['Agenda/AgendaHome'])
  }

  cancel(){
    this.agendaReader = true
    this.route.navigate(['Agenda/AgendaHome'])   
  }

  carregaCombos(){
      this.serviceEmpresa.read(Endpoint.Empresa).subscribe(emp => {
        this.empresa = emp;
      })
  }

}
