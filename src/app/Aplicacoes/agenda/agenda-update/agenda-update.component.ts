import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { endWith, filter } from 'rxjs/operators';
import { Agenda } from 'src/app/models/Agenda/modelAgenda';
import { GrupoAgenda } from 'src/app/models/Agenda/modelGrupoAgenda';
import { Empresa } from 'src/app/models/empresa/ModelEmpresa';
import { Sala } from 'src/app/models/Sala/SalaModel';
import { Unidade } from 'src/app/models/Unidade/unidadeModel';
import { Usuario } from 'src/app/models/usuarios/modelLogin';
import { Aplicacao } from 'src/app/Negocio/Aplicacao';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-agenda-update',
  templateUrl: './agenda-update.component.html',
  styleUrls: ['./agenda-update.component.css']
})
export class AgendaUpdateComponent implements OnInit {

  constructor(
            private router: Router,
            private utilService : UtilService,
            private agendaService : ServiceAllService<Agenda>,
            private serviceUnidade : ServiceAllService<Unidade>,
            private serviceSala : ServiceAllService<Sala>,
            private serviceGrupoAGenda : ServiceAllService<GrupoAgenda>,
            private serviceEmpresa : ServiceAllService<Empresa>,
            private serviceUsuario : ServiceAllService<Usuario>,
            public dialogRef: MatDialogRef <AgendaUpdateComponent>,


            ) { }

  comboProfissional  : Usuario[];
  comboUnidade : Unidade[];
  comboSala : Sala[];
  comboTipoGrupoAgenda : GrupoAgenda[];


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

  
  
  ngOnInit(): void {
 
    this.buscarAgendaPorId();
    
  
  }

      buscarAgendaPorId(){
             
        this.agendaService.readById(this.dialogRef.id, Endpoint.Agenda).subscribe(agId => {
              this.agenda = agId
              this.carregaCombos();
            });
      }

      carregaCombos(){
        
        this.serviceUsuario.read(Endpoint.Usuario).subscribe(pr => {
          this.comboProfissional = pr.filter(x => x.empresaid == this.utilService.Sessao().IdEmpresa )
        });

        
        this.serviceUnidade.read(Endpoint.Unidade).subscribe(un => {
          this.comboUnidade = un.filter(x => x.empresaid == Number(this.utilService.Sessao().IdEmpresa));
        });

        this.serviceSala.read(Endpoint.Sala).subscribe(sl =>{
          this.comboSala = sl.filter(x => x.empresaid == Number(this.utilService.Sessao().IdEmpresa));
        });
        
        this.serviceGrupoAGenda.read(Endpoint.GrupoAgenda).subscribe(ga => {
          this.comboTipoGrupoAgenda = ga.filter(x => x.empresaid == Number(this.utilService.Sessao().IdEmpresa));
        });
       
      } 

      UpdateAgenda(){
        this.agenda.id = this.dialogRef.id
        this.agendaService.update(this.agenda, Endpoint.Agenda).subscribe(() => {
          this.utilService.showMessage("Agenda Atualizada com Sucesso!", false)
          this.utilService.atualizaRota(Aplicacao.Agenda+"?", true)
          this.fecharPopup();
      
        });

      }

      fecharPopup(): void {
        this.dialogRef.close();
      }

}
