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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuarios/modelLogin';
import { Overlay } from '@angular/cdk/overlay';
import { UsuarioCreateComponent } from 'src/app/components/usuario/usuario-create/usuario-create.component';
import { AgendaGrupoCadastroComponent } from '../GrupoAgenda/agenda-grupo-cadastro/agenda-grupo-cadastro.component';
import { AgendaGrupoUpdateComponent } from '../GrupoAgenda/agenda-grupo-update/agenda-grupo-update.component';
import { AgendaGrupoExcluirComponent } from '../GrupoAgenda/agenda-grupo-excluir/agenda-grupo-excluir.component';
import { AgendaCadastroUnidadeComponent } from '../Unidade/agenda-cadastro-unidade/agenda-cadastro-unidade.component';
import { Horarios } from 'src/app/models/Agenda/modeloHorarios';
import { HorarioAgenda } from 'src/app/models/Agenda/modelHorarioAgenda';
import { query } from '@angular/animations';
import { AgendaDto } from 'src/app/models/Agenda/modelRetornoAgenda';
import { AgendaDeleteComponent } from '../agenda-delete/agenda-delete.component';
import { AgendaUpdateComponent } from '../agenda-update/agenda-update.component';


@Component({
  selector: 'app-agenda-create',
  templateUrl: './agenda-create.component.html',
  styleUrls: ['./agenda-create.component.css']
})
export class AgendaCreateComponent implements OnInit {
  
  agenda : Agenda = new Agenda()
  estadoForm : boolean = false;
  agendaSelecionada : number = 0;

  comboProfissional  : Usuario[];
  comboUnidade : Unidade[];
  comboSala : Sala[];
  comboTipoGrupoAgenda : GrupoAgenda[];
  empresa : Empresa[];

  //Grupo
  grupo : GrupoAgenda[]
  ColunasGrupo = ['id','dtCriacao','nomeGrupoAgenda','bloqueado','action']
  GrupoSelecionado : number = 0;

  //Horários
  segunda : HorarioAgenda[];
  terca : HorarioAgenda[];
  quarta : HorarioAgenda[];
  quinta : HorarioAgenda[];
  sexta : HorarioAgenda[];
  sabado : HorarioAgenda[];
  domingo : HorarioAgenda[];

  ColunasHorarios = ['Hora','Tempo']
  dadosHorarios : HorarioAgenda = new HorarioAgenda();


  Colunas = ['id', 'Agenda','Responsável','Unidade','Sala',
                      'Grupo','Inicio','Fim','bloqueado','action']  
  agendas : AgendaDto[];

  constructor(private route : Router,
              public dialogRef: MatDialogRef <AgendaCreateComponent>, 
              public overlay : Overlay,
              public dialog: MatDialog,         
              private _serviceAgenda : ServiceAllService<Agenda>,
              private _serviceUnidade : ServiceAllService<Unidade>,
              private _serviceSala : ServiceAllService<Sala>,
              private _serviceGrupoAgenda : ServiceAllService<GrupoAgenda>,
              private _serviceUsuario : ServiceAllService<Usuario>,
              private _utilService : UtilService,
              private servicoGrupo : ServiceAllService<GrupoAgenda>,
              private servicoHorario : ServiceAllService<HorarioAgenda>,
              private _repAgenda : ServiceAllService<AgendaDto>,

    ) { }


  ngOnInit(): void {
     this.carregaCombos()
     this.buscarHorarios();
     this._utilService.AtualizarMenu(Aplicacao.Agenda,'app_registration','');
    
     if(!this.estadoForm)
        this.buscarAgenda(null);

  }
  
  createAgenda(){
     this.agenda.Empresaid = Number(this._utilService.Sessao().IdEmpresa)
     this._serviceAgenda.create(this.agenda, Endpoint.Agenda).subscribe(ag => {
     this.agenda = ag;
     this._utilService.showMessage("Agenda cadastrada com sucesso!",false);
     this.route.navigate(['home-component'])
     });
        this.route.navigate(['home-component'])
  }

  cancel(){
    this.route.navigate(['home-component'])  
  }

  BuscarSala(){
      this.carregaComboSala(this._utilService.Sessao().GrupoUsuario, this._utilService.Sessao().IdEmpresa)
  }

  AtualizarComboProfissional(){
    this.carregaComboProfissional(this._utilService.Sessao().GrupoUsuario, this._utilService.Sessao().IdEmpresa)
  }

  carregaCombos(){

    this.carregaComboProfissional(this._utilService.Sessao().GrupoUsuario, this._utilService.Sessao().IdEmpresa)
      this.carregaComboUnidade(this._utilService.Sessao().GrupoUsuario, this._utilService.Sessao().IdEmpresa);
      
      
      this.carregaComboSala(this._utilService.Sessao().GrupoUsuario, this._utilService.Sessao().IdEmpresa);
      
      this.carregaComboGrupoAgenda(this._utilService.Sessao().GrupoUsuario, this._utilService.Sessao().IdEmpresa);
  }

  carregaComboProfissional(grpId: number , empId: string){
    this.comboProfissional =  new Array();
    this._serviceUsuario.read(Endpoint.Usuario).subscribe(pro => {
      pro = this.comboProfissional = grpId == TipoUsuario.Master || grpId == TipoUsuario.Administrador ? this.comboProfissional = pro.filter(x => x.empresaid.toString() == empId) : null;
    });
  }
  
  carregaComboUnidade(grpId: number , empId: string){
    this.comboUnidade =  new Array()
    this._serviceUnidade.read(Endpoint.Unidade).subscribe(un => {
      un = this.comboUnidade = grpId == TipoUsuario.Master || grpId == TipoUsuario.Administrador ? this.comboUnidade = un.filter(x => x.empresaid.toString() == empId) : null;
    });
  }

  carregaComboSala(grpId: number , empId: string){
    this.comboSala = new Array();

    this._serviceSala.read(Endpoint.Sala).subscribe(sl => {
      sl = this.comboSala = grpId == TipoUsuario.Master || grpId == TipoUsuario.Administrador? this.comboSala = sl.filter(x => x.empresaid .toString() == empId ) : null;                      
    });
    
  }

  carregaComboGrupoAgenda(grpId: number , empId: string){
    this.comboTipoGrupoAgenda = new Array();
    this._serviceGrupoAgenda.read(Endpoint.GrupoAgenda).subscribe(ga => {
      ga = this.comboTipoGrupoAgenda = grpId == TipoUsuario.Master || grpId == TipoUsuario.Administrador ? this.comboTipoGrupoAgenda = ga.filter(x => x.empresaid .toString() == empId) : null;
    });
  }

  AtualizarComboGrupoAgenda(){
    this.carregaComboGrupoAgenda(this._utilService.Sessao().GrupoUsuario, this._utilService.Sessao().IdEmpresa);
  }

  AtualizarComboUnidade(){
    this.carregaComboUnidade(this._utilService.Sessao().GrupoUsuario, this._utilService.Sessao().IdEmpresa);
  }

  fecharPopup(): void {
    this.estadoForm = false;
    this.agenda = new Agenda();
   }

  novoUsuario(){
    
    if(this._utilService.Sessao().GrupoUsuario == TipoUsuario.Master || this._utilService.Sessao().GrupoUsuario == TipoUsuario.Administrador)
    {
        this._utilService.Popup("", UsuarioCreateComponent ,"700px","820px");
    }else{
      this._utilService.showMessage("Solicitar ao um Usuário Master para criar Nova Agenda!",true);
    }
  }

  selecionaAbaAgenda(tab : any){
    
    switch (tab.index) {
      case 0 :
          this.buscarGrupos("")
        break;
      default:
        break;
    }
    
  }

  ////GRUPOPS//////
  selecionarGrupo(event : any){

      if(event.which == 1 || event.which ==13){
        
        let txtBuscaGrupo = (<HTMLInputElement>document?.getElementById('txtbuscaGrupo')).value
                
        if (txtBuscaGrupo != null)
          this.buscarGrupos(txtBuscaGrupo);
        }
  }

  ////AGENDAS//////
  selecionarAgenda(event : any){

    if(event.which == 1 || event.which ==13){
      
      let txtBuscaAgenda = (<HTMLInputElement>document?.getElementById('txtbuscaAgenda')).value
              
      if (txtBuscaAgenda != null)
        this.buscarAgenda(txtBuscaAgenda)
      }

}


  buscarGrupos(txtbusca : any){
    
    let agenda = this.agendas.filter;
    
    this.servicoGrupo.read(Endpoint.GrupoAgenda).subscribe(x => {
      this.grupo = txtbusca == null ? x : x.filter(x => x.nomeGrupoAgenda.toLocaleLowerCase().includes(txtbusca.toLocaleLowerCase()))
    })
  }

  cadGrupo(){
    this._utilService.Popup("", AgendaGrupoCadastroComponent, "500px", "500px");
  }

  AtualizarGrupo(id : string){
    this._utilService.Popup(id, AgendaGrupoUpdateComponent, "500px", "500px");
  }

  ExcluirGrupo(id : string){
    this._utilService.Popup(id, AgendaGrupoExcluirComponent, "500px", "500px");
  }

  novaUnidade(){
    this._utilService.Popup("", AgendaCadastroUnidadeComponent, "700px", "500px")
  }


  ///HORÁRIOS///////
  CriarHorarios(){
    
    if(this.dadosHorarios.diaDasemana == null)
      this._utilService.showMessage("Informe o dia da Semana", false);
    else if(this.dadosHorarios.tipoHorario == null)
      this._utilService.showMessage("Informe o tipo de horário", false);
    else if(this.dadosHorarios.intervalo == null)
      this._utilService.showMessage("Intervalo de tempo Obrigatório", false);
    else if (this.dadosHorarios.horainicio == null || this.dadosHorarios.horafim == null)
      this._utilService.showMessage("Informar inicio e fim da geração de Horas", false);
    else{
      this.dadosHorarios.dtCriacao = new Date;
      this.dadosHorarios.criadoPor = this._utilService.Sessao().UsuarioId;
      //this.dadosHorarios.id_agenda = Number(this.agenda.id);
      this.dadosHorarios.id_agenda = 1;
      this.dadosHorarios.id_empresa = Number(this._utilService.Sessao().IdEmpresa);
      this._utilService.showMessage("Aguarde Criando os Horários dessa agenda", false);    

      this.servicoHorario.create(this.dadosHorarios, Endpoint.AgendaHorarios).subscribe(h => {
        this._utilService.showMessage("Horários Criados como solicitado", false);  
        this.buscarHorarios();
      });

      
    }
    this.buscarHorarios();
  }

  buscarHorarios(){
    this.servicoHorario.read(Endpoint.AgendaHorarios).subscribe(x => {
      this.domingo = x.filter(x => x.diaDasemana == 1);
      this.segunda = x.filter(x => x.diaDasemana == 2);
      this.terca = x.filter(x => x.diaDasemana == 3);
      this.quarta = x.filter(x => x.diaDasemana == 4);
      this.quinta = x.filter(x => x.diaDasemana == 5);
      this.sexta = x.filter(x => x.diaDasemana == 6);
      this.sabado = x.filter(x => x.diaDasemana == 7);
    })
  }


  //Métodos de Edição da agenda
  cadAgenda(){
    this.estadoForm = true;
  }

  buscarAgenda (filtroAgenda : string){
    this._repAgenda.read(Endpoint.Agenda).subscribe(ag => {
      this.agendas = filtroAgenda == null ? ag.filter(x => x.empresaId.toString() == this._utilService.Sessao().IdEmpresa) 
                    :  ag.filter(x => x.nomeAgenda.toLowerCase().includes(filtroAgenda.toLowerCase()) && x.empresaId.toString() == this._utilService.Sessao().IdEmpresa)
    });
  }


  AtualizarAgenda(id : string): void {
    if(this._utilService.Sessao().GrupoUsuario == TipoUsuario.Master || this._utilService.Sessao().GrupoUsuario == TipoUsuario.Administrador)
    {
      let response  =  this._utilService.Popup(id, AgendaUpdateComponent, '30%','80%' )
      
      }else{
        this._utilService.showMessage("Solicitar ao um Usuário Master para Editar os  dados da Agenda!",true);
      }   
  }

  ExcluirAgenda(id : string): void {
      
    if(this._utilService.Sessao().GrupoUsuario == TipoUsuario.Master || this._utilService.Sessao().GrupoUsuario == TipoUsuario.Administrador)
      {
        this._utilService.Popup(id, AgendaDeleteComponent,'30%','25%');
      }
      else
      {
        this._utilService.showMessage("Solicitar ao um Usuário Master para Excluir a Agenda!",true);
      }
  }

  AgendaSelecionada(id : any){
    this.agendaSelecionada = 0;
    this.agendaSelecionada = id > 0 ? this.agendaSelecionada = id : 0;
  }

}
