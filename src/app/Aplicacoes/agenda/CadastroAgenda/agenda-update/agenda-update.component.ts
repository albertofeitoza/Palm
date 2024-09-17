import { Component, OnInit, Input } from '@angular/core';
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

  @Input() comboProfissional!: Usuario[];
  @Input() comboUnidade!: Unidade[];
  @Input() comboSala! : Sala[];
  @Input() comboTipoGrupoAgenda!: GrupoAgenda[];


  @Input() agenda!: Agenda
  
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
        this.BuscarUsuario()
        this.BuscarUnidade();
        this.BuscarSala();
        this.BuscarGrupoAgenda();
      
      } 

      UpdateAgenda(){
        this.agenda.id = Number(this.dialogRef.id)
        this.agendaService.update(this.agenda, Endpoint.Agenda).subscribe(() => {
          this.utilService.showMessage("Agenda Atualizada com Sucesso!", false)
          this.utilService.atualizaRota(Aplicacao.Agenda+"?", true)
          this.fecharPopup();
      
        });

      }

      fecharPopup(): void {
        this.dialogRef.close();
      }
     
      BuscarUsuario(){
        this.serviceUsuario.read(Endpoint.Usuarios).subscribe(pr => {
          this.comboProfissional = pr
        });
      }

      BuscarUnidade(){
        this.serviceUnidade.read(Endpoint.Unidade).subscribe(un => {
          this.comboUnidade = un;
        });
      }

      BuscarSala(){
        this.serviceSala.read(Endpoint.Sala).subscribe(sl =>{
          this.comboSala = sl.filter(x => x.unidadeid == this.agenda.unidadeId)
        });
      }
      BuscarGrupoAgenda(){
        this.serviceGrupoAGenda.read(Endpoint.GrupoAgenda).subscribe(ga => {
          this.comboTipoGrupoAgenda = ga
        });
      }

}
