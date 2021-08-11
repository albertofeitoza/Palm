import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Agenda } from 'src/app/models/Agenda/modelAgenda';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-agenda-delete',
  templateUrl: './agenda-delete.component.html',
  styleUrls: ['./agenda-delete.component.css']
})
export class AgendaDeleteComponent implements OnInit {

  agenda : Agenda = {  
    id: null,
    DtCriacao: new Date, 
    nomeAgenda: null,
    profissionalid: null,
    Empresaid: null,
    unidadeid: null,
    salaid: null,
    substituicao: false,
    grupoAgendaid: null,
    vigenciaInicio: null,
    vigenciaFim: null,
    considerarFeriado: false,
    bloqueado: false
  }

  constructor(
              public dialgRef : MatDialogRef<AgendaDeleteComponent>,
              private serviceAgenda : ServiceAllService<Agenda>,
              private utilService : UtilService,
              private route : Router

             ) { }

  ngOnInit(): void {
    this.buscarAgendaByid();
    
  }

  ExcluirAgenda(): void{
      this.serviceAgenda.delete(Number(this.dialgRef.id), Endpoint.Agenda).subscribe(x => {
          this.utilService.showMessage("Agenda Excluida com sucesso", false);
          this.route.navigate(['home-component'])
          this.fecharPopup();

      });
  }

  fecharPopup():void{
      this.dialgRef.close();
  }
  buscarAgendaByid() : void {
     this.serviceAgenda.readById(this.dialgRef.id, Endpoint.Agenda).subscribe(ag => {
       this.agenda = ag;
     });
  }


}
 
  

