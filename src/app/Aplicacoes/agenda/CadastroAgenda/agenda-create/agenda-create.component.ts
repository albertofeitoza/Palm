import { Endpoint } from '../../../../Negocio/Endpoint';
import { ServiceAllService } from '../../../../services/service-all.service';
import { Empresa } from '../../../../models/empresa/ModelEmpresa';
import { Aplicacao } from '../../../../Negocio/Aplicacao';
import { Router } from '@angular/router';
import { Agenda } from 'src/app/models/Agenda/modelAgenda';
import { UtilService } from 'src/app/services/util.service';
import { TipoUsuario, TipoUsuarioSistema } from 'src/app/models/usuarios/enumUsuarios';
import { Unidade } from 'src/app/models/Unidade/unidadeModel';
import { Sala } from 'src/app/models/Sala/SalaModel';
import { GrupoAgenda } from 'src/app/models/Agenda/modelGrupoAgenda';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuarios/modelLogin';
import { UsuarioCreateComponent } from 'src/app/components/usuario/usuario-create/usuario-create.component';
import { AgendaGrupoCadastroComponent } from '../../GrupoAgenda/agenda-grupo-cadastro/agenda-grupo-cadastro.component';
import { AgendaGrupoUpdateComponent } from '../../GrupoAgenda/agenda-grupo-update/agenda-grupo-update.component';
import { AgendaGrupoExcluirComponent } from '../../GrupoAgenda/agenda-grupo-excluir/agenda-grupo-excluir.component';
import { AgendaCadastroUnidadeComponent } from '../../Unidade/agenda-cadastro-unidade/agenda-cadastro-unidade.component';
import { HorarioAgenda } from 'src/app/models/Agenda/modelHorarioAgenda';
import { AgendaDto } from 'src/app/models/Agenda/modelRetornoAgenda';
import { AgendaDeleteComponent } from '../agenda-delete/agenda-delete.component';
import { AgendaUpdateComponent } from '../agenda-update/agenda-update.component';
import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';


@Component({
  selector: 'app-agenda-create',
  templateUrl: './agenda-create.component.html',
  styleUrls: ['./agenda-create.component.css']
})
export class AgendaCreateComponent implements OnInit {
  
  agenda : Agenda = new Agenda()
  estadoForm : boolean = false;
  agendaSelecionada : number = 0;

  comboProfissional : any = new Array();
  comboUnidade : any = [];
  comboSala : any = [];
  comboTipoGrupoAgenda : any = [];
  empresa : any = [];

  //Grupo
  grupo : GrupoAgenda[] = [];
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
  dadosHorarios : HorarioAgenda = new  HorarioAgenda();


  Colunas = ['id', 'Agenda','Responsável','Unidade','Sala',
                      'Grupo','Inicio','Fim','bloqueado','action']  
  agendas : AgendaDto[] = [];

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
      this._utilService.AtualizarMenu(Aplicacao.Agenda,'app_registration','');
    
    if(!this.estadoForm)
      this.buscarAgenda("");

    this.buscarHorarios(this.agendaSelecionada);        

  }
  
  createAgenda(){
    this.agendaSelecionada = 0;
     this.agenda.empresaid = Number(this._utilService.Sessao().empresaUsuarioId)
     this._serviceAgenda.create(this.agenda, Endpoint.Agenda).subscribe(ag => {
     this.agenda = ag;
     this.agenda.DtCriacao = new Date;
     this._utilService.showMessage("Agenda cadastrada com sucesso!",false);
     this.route.navigate(['home-component'])
     });
        this.route.navigate(['home-component'])
  }

  cancel(){
    this.route.navigate(['home-component'])  
  }

  BuscarSala(){
    this.carregaComboSala(this._utilService.Sessao().idGrupoUsuario, this._utilService.Sessao().empresaUsuarioId.toString())
  }

  AtualizarComboProfissional(){
    this.carregaComboProfissional(this._utilService.Sessao().idGrupoUsuario, this._utilService.Sessao().empresaUsuarioId.toString())
  }

  carregaCombos(){

    this.carregaComboProfissional(this._utilService.Sessao().idGrupoUsuario, this._utilService.Sessao().empresaUsuarioId.toString())
      this.carregaComboUnidade(this._utilService.Sessao().idGrupoUsuario, this._utilService.Sessao().empresaUsuarioId.toString());
      this.carregaComboSala(this._utilService.Sessao().idGrupoUsuario, this._utilService.Sessao().empresaUsuarioId.toString());
      this.carregaComboGrupoAgenda(this._utilService.Sessao().idGrupoUsuario, this._utilService.Sessao().empresaUsuarioId.toString());
  }

  carregaComboProfissional(grpId: string , empId: string){
    this.comboProfissional =  new Array();
    
    this._serviceUsuario.read(Endpoint.Usuario).subscribe((data: {} ) => {
    
    this.comboProfissional = grpId == TipoUsuario.Master.toString() || grpId == TipoUsuario.Administrador.toString() ? this.comboProfissional = data : null;
    
    });
  }
  
  carregaComboUnidade(grpId: string , empId: string){
    this.comboUnidade =  new Array()
    this._serviceUnidade.read(Endpoint.Unidade).subscribe((un : {})  =>  {
     this.comboUnidade = grpId == TipoUsuario.Master.toString() || grpId == TipoUsuario.Administrador.toString() ? this.comboUnidade = un: null;
    });
  }

  carregaComboSala(grpId: string , empId: string){
    this.comboSala = new Array();
    this._serviceSala.read(Endpoint.Sala).subscribe(sl => {
      this.comboSala = sl.filter(x => x.unidadeid == this.agenda.unidadeid);                      
    });
    
  }

  carregaComboGrupoAgenda(grpId: string , empId: string){
    this.comboTipoGrupoAgenda = new Array();
    this._serviceGrupoAgenda.read(Endpoint.GrupoAgenda).subscribe((ga: {}) => {
      this.comboTipoGrupoAgenda = grpId == TipoUsuario.Master.toString() || grpId == TipoUsuario.Administrador.toString() ? this.comboTipoGrupoAgenda = ga : null;
    });
  }

  AtualizarComboGrupoAgenda(){
    this.carregaComboGrupoAgenda(this._utilService.Sessao().idGrupoUsuario, this._utilService.Sessao().empresaUsuarioId.toString());
  }

  AtualizarComboUnidade(){
    this.carregaComboUnidade(this._utilService.Sessao().idGrupoUsuario, this._utilService.Sessao().empresaUsuarioId.toString());
  }

  EstadoForm(): void {
    this.estadoForm = false;
   
  }

  fecharPopup(){
    this.dialogRef.close();

  }

  novoUsuario(){
    
    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Master.toString() || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    {
        this._utilService.Popup("", UsuarioCreateComponent ,"700px","820px");
    }else{
      this._utilService.showMessage("Solicitar ao um Usuário Master para criar Nova Agenda!",true);
    }
  }

  selecionaAbaAgenda(tab : any){
    
    switch (tab.index) {
      case 1 :
          this.buscarGrupos("");
        break;
        case 2 :
          this.selecionarHorários();
        break;
        case 2 :
          this.selecionarDiaNaoatende();
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


 buscarGrupos (txtbusca : any){
    
    this.servicoGrupo.read(Endpoint.GrupoAgenda).subscribe(x => {
      this.grupo = txtbusca == null  ? x : x.filter(x => x.nomeGrupoAgenda.toLocaleLowerCase().includes(txtbusca.toLocaleLowerCase()))
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
    else if (this.agendaSelecionada == 0)  
    this._utilService.showMessage("Selecionar a Agenda para criação de Horários", false);
    else{
      this.dadosHorarios.dtCriacao = new Date;
      this.dadosHorarios.criadoPor = this._utilService.Sessao().usuarioId;
      this.dadosHorarios.agendaid = Number(this.agendaSelecionada);
      
      this._utilService.showMessage("Aguarde Criando os Horários dessa agenda", false);    
   
      this.servicoHorario.create(this.dadosHorarios, Endpoint.AgendaHorarios).subscribe(h => {
        this._utilService.showMessage("Horários Criados como solicitado", false);  
        this.buscarHorarios(this.agendaSelecionada);
      });

      
    }
    this.buscarHorarios(this.agendaSelecionada);
  }

  selecionarHorários(){
    
    this.agendaSelecionada > 0 
     ? this.buscarHorarios(this.agendaSelecionada)
     : this._utilService.showMessage("Selecionar a agenda para acessar os horários.", false)
  }

  selecionarDiaNaoatende(){

  }
  buscarHorarios(id : any){
    
    if(id > 0)
    {
      this.servicoHorario.read(Endpoint.AgendaHorarios).subscribe(x => {
        this.domingo = x.filter(x => x.diaDasemana == 1 && x.agendaid == id);
        this.segunda = x.filter(x => x.diaDasemana == 2 && x.agendaid == id);
        this.terca = x.filter(x => x.diaDasemana == 3 && x.agendaid == id);
        this.quarta = x.filter(x => x.diaDasemana == 4 && x.agendaid == id);
        this.quinta = x.filter(x => x.diaDasemana == 5 && x.agendaid == id);
        this.sexta = x.filter(x => x.diaDasemana == 6 && x.agendaid == id);
        this.sabado = x.filter(x => x.diaDasemana == 7 && x.agendaid == id);
      });
    }
  }


  //Métodos de Edição da agenda
  cadAgenda(){
    this.estadoForm = true;
  }

  buscarAgenda (filtroAgenda : string){
    this._repAgenda.read(Endpoint.Agenda).subscribe(ag => {
      this.agendas = filtroAgenda == null ? ag 
                    :  ag.filter(x => x.nomeAgenda.toLowerCase().includes(filtroAgenda.toLowerCase()) 
                    || x.nomeGrupoAgenda.toLowerCase().includes(filtroAgenda.toLowerCase())) 

    });
  }


  AtualizarAgenda(id : string): void {
    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Master.toString() || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    {
      let response  =  this._utilService.Popup(id, AgendaUpdateComponent, '30%','80%' )
      
      }else{
        this._utilService.showMessage("Solicitar ao um Usuário Master para Editar os  dados da Agenda!",true);
      }   
  }

  ExcluirAgenda(id : string): void {
      
    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Master.toString() || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
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
