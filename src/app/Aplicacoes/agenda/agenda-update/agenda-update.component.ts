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
            private route: ActivatedRoute,
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
  empresa : Empresa[];



  agenda : Agenda = {  
    id: null,
    DtCriacao: new Date, 
    nomeAgenda: null,
    Profissionalid: null,
    Empresaid: null,
    Unidadeid: null,
    Salaid: null,
    substituicao: false,
    GrupoAgendaid: null,
    vigenciaInicio: null,
    vigenciaFim: null,
    considerarFeriado: false,
    bloqueado: false
  }

  
  
  ngOnInit(): void {
 
    this.buscarAgendaPorId();
  
  }

      UpdateAgenda(){
        this.agenda.id = this.dialogRef.id
        this.agendaService.update(this.agenda, Endpoint.Agenda).subscribe(() => {
          this.utilService.showMessage("Agenda Atualizada com Sucesso!", false)
          this.router.navigate(['home-component'])
          this.fecharPopup();
      
        });

      }

      buscarAgendaPorId(){
             
        this.agendaService.readById(this.dialogRef.id, Endpoint.Agenda).subscribe(agId => {
              this.agenda = agId
              this.carregaCombos();
            });
      }

      carregaCombos(){

        let empId = Number(localStorage.getItem("empId"))

        this.serviceUsuario.read(Endpoint.Usuario).subscribe(pr => {
          this.comboProfissional = pr.filter(x => x.profissional && Number(x.empresaid) == empId );
        });

        this.serviceUnidade.read(Endpoint.Unidade).subscribe(un => {
          this.comboUnidade = un.filter(x => x.empresaid == empId );
        });

        this.serviceSala.read(Endpoint.Sala).subscribe(sl =>{
          this.comboSala = sl.filter(x => x.empresaid == empId );
        });
        
        this.serviceGrupoAGenda.read(Endpoint.GrupoAgenda).subscribe(ga => {
          this.comboTipoGrupoAgenda = ga.filter(x => x.empresaid == empId );
        });
        
        this.serviceEmpresa.read(Endpoint.Empresa).subscribe(emp => {
          this.empresa = emp.filter(x => x.id == empId );
        })
      }

      fecharPopup(): void {
        this.dialogRef.close();
      }

}
