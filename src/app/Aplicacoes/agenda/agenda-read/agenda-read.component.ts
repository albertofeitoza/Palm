import { Router } from '@angular/router';
import { Componentes } from './../../../Negocio/Componentes';
import { Aplicacao } from './../../../Negocio/Aplicacao';
import { UtilService } from './../../../services/util.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-agenda-read',
  templateUrl: './agenda-read.component.html',
  styleUrls: ['./agenda-read.component.css']
})
export class AgendaReadComponent implements OnInit {


  carregaComponente : string


  constructor(private UtilService : UtilService,
              private route : Router
             ) { }

  ngOnInit(): void {
    this.UtilService.AtualizarMenu(Aplicacao.Agenda,'app_registration','')
  }

  RotaInterna(rota : string){
    this.carregaComponente = rota;
    this.route.navigate(['Agenda'])   
    
 
  }

}
