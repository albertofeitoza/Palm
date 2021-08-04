import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Aplicacao } from './../../../Negocio/Aplicacao';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Agenda } from 'src/app/models/Agenda/modelAgenda';
import { UtilService } from 'src/app/services/util.service';
import { TipoUsuario, TipoUsuarioSistema } from 'src/app/models/usuarios/enumUsuarios';
import { Unidade } from 'src/app/models/Unidade/unidadeModel';
import { Sala } from 'src/app/models/Sala/SalaModel';
import { GrupoAgenda } from 'src/app/models/Agenda/modelGrupoAgenda';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuarios/modelLogin';

@Component({
  selector: 'app-agenda-create',
  templateUrl: './agenda-create.component.html',
  styleUrls: ['./agenda-create.component.css']
})
export class AgendaCreateComponent implements OnInit {
  
  agenda : Agenda = {
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
  
  comboProfissional  : Usuario[];
  comboUnidade : Unidade[];
  comboSala : Sala[];
  comboTipoGrupoAgenda : GrupoAgenda[];
  empresa : Empresa[];

  constructor(private route : Router,
    public dialogRef: MatDialogRef <AgendaCreateComponent>,          
              private _serviceAgenda : ServiceAllService<Agenda>,
              private _serviceUnidade : ServiceAllService<Unidade>,
              private _serviceSala : ServiceAllService<Sala>,
              private _serviceGrupoAgenda : ServiceAllService<GrupoAgenda>,
              private _serviceUsuario : ServiceAllService<Usuario>,
              private _utilService : UtilService
    ) { }


  ngOnInit(): void {
     this.carregaCombos()
  }
  
  createAgenda(){
     this.agenda.Empresaid = Number(this._utilService.Sessao().IdEmpresa)
 
      this._serviceAgenda.create(this.agenda, Endpoint.Agenda).subscribe(ag => {
      this._utilService.showMessage("Agenda cadastrada com sucesso!",false);
      this.route.navigate(['home-component'])
      });
        this.route.navigate(['home-component'])
  }

  cancel(){
    this.route.navigate(['home-component'])  
  }

  carregaCombos(){

    this.carregaComboProfissional(this._utilService.Sessao().GrupoUsuario, this._utilService.Sessao().IdEmpresa)
      this.carregaComboUnidade(this._utilService.Sessao().GrupoUsuario, this._utilService.Sessao().IdEmpresa);
      this.carregaComboSala(this._utilService.Sessao().GrupoUsuario, this._utilService.Sessao().IdEmpresa);
      this.carregaComboGrupoAgenda(this._utilService.Sessao().GrupoUsuario, this._utilService.Sessao().IdEmpresa);
  }

  carregaComboProfissional(grpId: number , empId: string){
    this._serviceUsuario.read(Endpoint.Usuario).subscribe(pro => {
      pro = this.comboProfissional = grpId == TipoUsuario.Master || grpId == TipoUsuario.Administrador ? this.comboProfissional = pro.filter(x => x.empresaid.toString() == empId) : null;
    });
  }
  
  carregaComboUnidade(grpId: number , empId: string){
    this._serviceUnidade.read(Endpoint.Unidade).subscribe(un => {
      un = this.comboUnidade = grpId == TipoUsuario.Master || grpId == TipoUsuario.Administrador ? this.comboUnidade = un.filter(x => x.empresaid.toString() == empId) : null;
    });
  }

  carregaComboSala(grpId: number , empId: string){
    this._serviceSala.read(Endpoint.Sala).subscribe(sl => {
      sl = this.comboSala = grpId == TipoUsuario.Master || grpId == TipoUsuario.Administrador? this.comboSala = sl.filter(x => x.empresaid .toString() == empId) : null;                      
    });
  }

  carregaComboGrupoAgenda(grpId: number , empId: string){
    this._serviceGrupoAgenda.read(Endpoint.GrupoAgenda).subscribe(ga => {
      ga = this.comboTipoGrupoAgenda = grpId == TipoUsuario.Master || grpId == TipoUsuario.Administrador ? this.comboTipoGrupoAgenda = ga.filter(x => x.empresaid .toString() == empId) : null;
    });
  }

  fecharPopup(): void {
    this.dialogRef.close();
  }
}
