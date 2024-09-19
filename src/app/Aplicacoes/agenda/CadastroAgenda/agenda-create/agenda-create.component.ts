import { Endpoint } from '../../../../Negocio/Endpoint';
import { ServiceAllService } from '../../../../services/service-all.service';
import { Aplicacao } from '../../../../Negocio/Aplicacao';
import { Router } from '@angular/router';
import { Agenda } from 'src/app/models/Agenda/modelAgenda';
import { UtilService } from 'src/app/services/util.service';
import { TipoUsuario } from 'src/app/models/usuarios/enumUsuarios';
import { Unidade } from 'src/app/models/Unidade/unidadeModel';
import { Sala } from 'src/app/models/Sala/SalaModel';
import { GrupoAgenda } from 'src/app/models/Agenda/modelGrupoAgenda';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgendaGrupoCadastroComponent } from '../../GrupoAgenda/agenda-grupo-cadastro/agenda-grupo-cadastro.component';
import { AgendaGrupoUpdateComponent } from '../../GrupoAgenda/agenda-grupo-update/agenda-grupo-update.component';
import { AgendaCadastroUnidadeComponent } from '../../Unidade/agenda-cadastro-unidade/agenda-cadastro-unidade.component';
import { HorarioAgenda } from 'src/app/models/Agenda/modelHorarioAgenda';
import { AgendaDto } from 'src/app/models/Agenda/modelRetornoAgenda';
import { Component, OnInit } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { LoginService } from 'src/app/services/login.service';
import { ViewPessoa } from 'src/app/models/Pessoa/ViewPessoa';
import { DetalhesDiasDisponiveisAgendaComponent } from './modal/detalhes-dias-disponiveis-agenda/detalhes-dias-disponiveis-agenda.component';
import { CatalogoServico } from 'src/app/models/CatalogoServico/CatalogoServico';
import { PopupSelecaoIdsComponent } from 'src/app/components/Popups/popup-selecao-ids/popup-selecao-ids.component';
import { AgendaCatalogoServico } from 'src/app/models/Agenda/AgendaCatalogoServico';
import { PopupConfirmacaoComponent } from 'src/app/components/Popups/popup-confirmacao/popup-confirmacao.component';


@Component({
  selector: 'app-agenda-create',
  templateUrl: './agenda-create.component.html',
  styleUrls: ['./agenda-create.component.css']
})
export class AgendaCreateComponent implements OnInit {

  agenda: Agenda = new Agenda()
  estadoForm: boolean = false;
  agendaSelecionada: number = 0;

  comboProfissional: ViewPessoa[] = new Array();
  comboUnidade: Unidade[] = new Array();
  comboSala: any = [];
  comboTipoGrupoAgenda: any = [];
  empresa: any = [];

  //Grupo
  grupos: GrupoAgenda[] = [];
  ColunasGrupo = ['id', 'dtCriacao', 'nomeGrupoAgenda', 'bloqueado', 'action']
  GrupoSelecionado: number = 0;

  //Horários

  // todosHorarios: HorarioAgenda[] = new Array();

  segunda: Date[] = new Array();
  terca: Date[] = new Array();
  quarta: Date[] = new Array();
  quinta: Date[] = new Array();
  sexta: Date[] = new Array();
  sabado: Date[] = new Array();
  domingo: Date[] = new Array();

  detalhesDomingo: HorarioAgenda[] = new Array();
  detalhesSegunda: HorarioAgenda[] = new Array();
  detalhesTerca: HorarioAgenda[] = new Array();
  detalhesQuarta: HorarioAgenda[] = new Array();
  detalhesQuinta: HorarioAgenda[] = new Array();
  detalhesSexta: HorarioAgenda[] = new Array();
  detalhesSabado: HorarioAgenda[] = new Array();

  ColunasDatas = ['data']
  dadosHorarios: HorarioAgenda = new HorarioAgenda();


  Colunas = ['id', 'Agenda', 'Responsável', 'Unidade', 'Sala', 'Grupo', 'Inicio', 'Fim', 'bloqueado', 'action']

  ColunasServicosAgendaveis = ['id', 'nome', 'codigo', 'codigoBarras', 'valor', 'action'];


  // {
  //   "id": 1,
  //   "dtCriacao": "2024-09-16T11:55:42.423042",
  //   "codigoBarras": "121321231",
  //   "qrCode": "21212121",
  //   "codigo": "TST",
  //   "qtdEstoque": 1000,
  //   "nome": "CONSULTA TST",
  //   "tipoCatalogo": 1,
  //   "peso": 0,
  //   "margem": 0,
  //   "valorCompra": 0,
  //   "valor": 250,
  //   "excluido": false,
  //   "empresaId": 1
  // },


  agendas: AgendaDto[] = [];

  catalogoServicosAgenda: CatalogoServico[] = new Array();

  constructor(private route: Router,
    public dialogRef: MatDialogRef<AgendaCreateComponent>,
    public overlay: Overlay,
    public dialog: MatDialog,
    private serviceApi: ServiceAllService<any>,
    private _serviceAgenda: ServiceAllService<Agenda>,
    private _serviceUnidade: ServiceAllService<Unidade>,
    private _serviceSala: ServiceAllService<Sala>,
    private _serviceGrupoAgenda: ServiceAllService<GrupoAgenda>,
    private _serviceUsuario: ServiceAllService<any>,
    private _utilService: UtilService,
    private servicoGrupo: ServiceAllService<GrupoAgenda>,
    private servicoHorario: ServiceAllService<HorarioAgenda>,
    private _repAgenda: ServiceAllService<AgendaDto>,
    private auth: LoginService

  ) { }


  ngOnInit(): void {
    //this.carregaCombos()
    this._utilService.AtualizarMenu(Aplicacao.Agenda, 'app_registration', '');

    if (!this.estadoForm)
      this.buscarAgenda("");

    //this.buscarHorarios(this.agendaSelecionada);


  }

  public createAgenda(): void {
    this.agendaSelecionada = 0;
    this.agenda.empresaId = Number(this.auth.dadosUsuario.EmpresaId)
    this._serviceAgenda.create(this.agenda, Endpoint.Agenda)
      .subscribe((result: Agenda) => {
        this.agenda = result;
        this.agenda.dtCriacao = new Date;
        this._utilService.showMessage("Dados salvos com sucesso!", false);
        this.buscarAgenda("")
      });
  }

  cancel() {
    this.route.navigate(['home-component'])
  }

  BuscarSala() {
    //this.carregaComboSala(this._utilService.Sessao().idGrupoUsuario, this._utilService.Sessao().empresaUsuarioId.toString())
  }

  AtualizarComboProfissional() {
    this.carregaComboProfissional();
  }

  private carregaCombos(): void {

    this.carregaComboProfissional()
    this.carregaComboUnidade();
    this.carregaComboSala();
    this.carregaComboGrupoAgenda();
  }

  private carregaComboProfissional(): void {

    this.comboProfissional = new Array();
    if (this._utilService.Sessao().TipoUsuarioLogado === TipoUsuario.MasterEmpresa || this._utilService.Sessao().TipoUsuarioLogado === TipoUsuario.Administrador) {

      this.serviceApi.read(Endpoint.Pessoa + `/estabelecimento/${this._utilService.Sessao().EmpresaId}`)
        .subscribe((result: ViewPessoa[]) => {
          this.comboProfissional = result
        })
    }
  }

  private carregaComboUnidade(): void {
    if (this._utilService.Sessao().TipoUsuarioLogado === TipoUsuario.MasterEmpresa || this._utilService.Sessao().TipoUsuarioLogado === TipoUsuario.Administrador) {

      this.serviceApi.read(Endpoint.Unidade + `/estabelecimento/${this._utilService.Sessao().EmpresaId}`)
        .subscribe((result: Unidade[]) => {
          this.comboUnidade = result
        })
    }
  }

  private carregaComboSala(): void {
    this.comboSala = new Array();
    this._serviceSala.read(Endpoint.Sala)
      .subscribe(sl => {
        this.comboSala = sl.filter(x => x.unidadeid == this.agenda.unidadeId);
      });

  }

  private carregaComboGrupoAgenda(): void {
    this.comboTipoGrupoAgenda = new Array();

    if (this._utilService.Sessao().TipoUsuarioLogado === TipoUsuario.MasterEmpresa || this._utilService.Sessao().TipoUsuarioLogado === TipoUsuario.Administrador) {
      this._serviceGrupoAgenda.read(Endpoint.GrupoAgenda + `/estabelecimento/${this._utilService.Sessao().EmpresaId}`)
        .subscribe(result => {
          this.comboTipoGrupoAgenda = result;
        });
    }
  }



  AtualizarComboGrupoAgenda() {
    // this.carregaComboGrupoAgenda(this._utilService.Sessao().idGrupoUsuario, this._utilService.Sessao().empresaUsuarioId.toString());
  }

  AtualizarComboUnidade() {
    this.carregaComboUnidade();
  }

  public Voltar(): void {
    this.estadoForm = false;

  }

  fecharPopup() {
    this.dialogRef.close();

  }

  novoUsuario() {

    // if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.MasterEmpresa.toString() || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    // {
    //     this._utilService.Popup("", UsuarioCreateComponent ,"700px","820px");
    // }else{
    //   this._utilService.showMessage("Solicitar ao um Usuário Master para criar Nova Agenda!",true);
    // }
  }

  public selecionaAbaAgenda(tab: any): void {
    switch (tab.index) {
      case 1:
        this.buscarGrupos("");
        break;
      case 2:
        this.selecionarHorários();
        break;
      case 3:
        this.selecionarDiaNaoatende();
        break;
      case 4:
        this.SelecionarCatalogoServicos();
        break;
      default:
        break;
    }

  }

  ////GRUPOPS//////
  selecionarGrupo(event: any) {

    if (event.which == 1 || event.which == 13) {

      let txtBuscaGrupo = (<HTMLInputElement>document?.getElementById('txtbuscaGrupo')).value

      if (txtBuscaGrupo != null)
        this.buscarGrupos(txtBuscaGrupo);
    }
  }

  ////AGENDAS//////
  selecionarAgenda(event: any) {

    if (event.which == 1 || event.which == 13) {

      let txtBuscaAgenda = (<HTMLInputElement>document?.getElementById('txtbuscaAgenda')).value

      if (txtBuscaAgenda != null)
        this.buscarAgenda(txtBuscaAgenda)
    }

  }


  buscarGrupos(txtbusca: any) {

    this.servicoGrupo.read(Endpoint.GrupoAgenda + `/estabelecimento/${this._utilService.Sessao().EmpresaId}`)
      .subscribe(x => {
        this.grupos = txtbusca == null ? x : x.filter(x => x.nomeGrupoAgenda.toLocaleLowerCase().includes(txtbusca.toLocaleLowerCase()))
      })
  }

  cadGrupo() {
    this._utilService.Popup("", AgendaGrupoCadastroComponent, "500px", "500px")
      .subscribe(() => {
        this.buscarGrupos("");
      });
  }

  AtualizarGrupo(id: string) {
    this._utilService.Popup(id, AgendaGrupoUpdateComponent, "500px", "500px")
      .subscribe(() => {
        this.buscarGrupos("");
      });
  }

  // ExcluirGrupo(id: string) {
  //   this._utilService.Popup(id, AgendaGrupoExcluirComponent, "500px", "500px");
  // }

  novaUnidade() {
    this._utilService.Popup("", AgendaCadastroUnidadeComponent, "700px", "500px")
  }


  ///HORÁRIOS///////
  CriarHorarios() {

    if (this.dadosHorarios.diaDasemana == null)
      this._utilService.showMessage("Informe o dia da Semana", false);
    else if (this.dadosHorarios.tipoHorario == null)
      this._utilService.showMessage("Informe o tipo de horário", false);
    else if (this.dadosHorarios.intervalo == null)
      this._utilService.showMessage("Intervalo de tempo Obrigatório", false);
    else if (this.dadosHorarios.horaInicio == null || this.dadosHorarios.horaFim == null)
      this._utilService.showMessage("Informar inicio e fim da geração de Horas", false);
    else if (this.agendaSelecionada == 0)
      this._utilService.showMessage("Selecionar a Agenda para criação de Horários", false);
    else {
      this.dadosHorarios.data = new Date;
      this.dadosHorarios.criadoPor = this._utilService.Sessao().IdUsuario;
      this.dadosHorarios.agendaId = Number(this.agendaSelecionada);
      this.dadosHorarios.hora = this.dadosHorarios.horaInicio;
      this._utilService.showMessage("Aguarde Criando os Horários dessa agenda", false);

      this.servicoHorario.create(this.dadosHorarios, Endpoint.AgendaHorarios)
        .subscribe(h => {
          this._utilService.showMessage("Horários Criados como solicitado", false);
          this.buscarHorarios(this.agendaSelecionada);
        });


    }
    this.buscarHorarios(this.agendaSelecionada);
  }

  public selecionarHorários(): void {

    this.agendaSelecionada > 0
      ? this.buscarHorarios(this.agendaSelecionada)
      : this._utilService.showMessage("Selecionar a agenda para acessar os horários.", false)
  }

  public selecionarDiaNaoatende(): void {
    this.agendaSelecionada > 0
      ? this.BuscarServicosAgendaveis(this.agendaSelecionada)
      : this._utilService.showMessage("Selecionar a agenda para acessar os dias não agendáveis.", false)
  }

  public SelecionarCatalogoServicos() {
    this.agendaSelecionada > 0
      ? this.BuscarServicosAgendaveis(this.agendaSelecionada)
      : this._utilService.showMessage("Selecionar a agenda para acessar os serviços.", false)
  }

  private buscarHorarios(id: any): void {

    if (id > 0) {
      this.servicoHorario.read(Endpoint.AgendaHorarios + `/agenda/${id}`)
        .subscribe((result: HorarioAgenda[]) => {

          // this.todosHorarios = result;

          // this.detalhesDomingo = result.filter(x => x.diaDasemana == 1 && x.agendaId == id);
          // this.detalhesSegunda = result.filter(x => x.diaDasemana == 2 && x.agendaId == id);
          // this.detalhesTerca = result.filter(x => x.diaDasemana == 3 && x.agendaId == id);
          // this.detalhesQuarta = result.filter(x => x.diaDasemana == 4 && x.agendaId == id);
          // this.detalhesQuinta = result.filter(x => x.diaDasemana == 5 && x.agendaId == id);
          // this.detalhesSexta = result.filter(x => x.diaDasemana == 6 && x.agendaId == id);
          // this.detalhesSabado = result.filter(x => x.diaDasemana == 7 && x.agendaId == id);

          this.domingo = [...new Set(result.filter(x => x.diaDasemana == 1 && x.agendaId == id).map(dt => dt.data))];
          this.segunda = [...new Set(result.filter(x => x.diaDasemana == 2 && x.agendaId == id).map(dt => dt.data))];
          this.terca = [...new Set(result.filter(x => x.diaDasemana == 3 && x.agendaId == id).map(dt => dt.data))];
          this.quarta = [...new Set(result.filter(x => x.diaDasemana == 4 && x.agendaId == id).map(dt => dt.data))];
          this.quinta = [...new Set(result.filter(x => x.diaDasemana == 5 && x.agendaId == id).map(dt => dt.data))];
          this.sexta = [...new Set(result.filter(x => x.diaDasemana == 6 && x.agendaId == id).map(dt => dt.data))];
          this.sabado = [...new Set(result.filter(x => x.diaDasemana == 7 && x.agendaId == id).map(dt => dt.data))];
        });
    }
  }

  public CadastroAgenda(): void {
    this.estadoForm = true;
    this.carregaCombos()
  }


  public CadastroCatalogo(): void {

    if (this.agendaSelecionada > 0) {
      this._utilService.Popup(this.agendaSelecionada, PopupSelecaoIdsComponent, '70%', '60%', false)
        .subscribe((result: CatalogoServico[]) => {
          if (result && result.length > 0) {

            let agendaCatalogo: AgendaCatalogoServico[] = new Array();
            result.forEach(cat => {
              let agendaCatalogoItem: AgendaCatalogoServico = new AgendaCatalogoServico();
              agendaCatalogoItem.id = 0;
              agendaCatalogoItem.dtCriacao = new Date;
              agendaCatalogoItem.agendaId = this.agendaSelecionada;
              agendaCatalogoItem.catalogoServicosId = cat.id;

              agendaCatalogo.push(agendaCatalogoItem);
            });

            this.serviceApi.create(agendaCatalogo, Endpoint.AgendaCatalogoServico)
              .subscribe((agendaId) => {
                this._utilService.showMessage("Serviços associados a agenda", false);
                this.BuscarServicosAgendaveis(agendaId)
                this.agendaSelecionada = agendaId;
              })
          } else {
            this._utilService.showMessage("Informações ignoradas", false);
          }
        })
    } else
      this._utilService.showMessage("Selecione uma agenda para cadastrar os serviços", true);

  }

  private buscarAgenda(filtroAgenda: string): void {
    this._repAgenda.read(Endpoint.Agenda + `/estabelecimento/${this._utilService.Sessao().EmpresaId}`)
      .subscribe((result: AgendaDto[]) => {
        this.agendas = filtroAgenda == null ? result
          : result.filter(x => x.nomeAgenda.toLowerCase().includes(filtroAgenda.toLowerCase())
            || x.nomeGrupoAgenda.toLowerCase().includes(filtroAgenda.toLowerCase()))
      });
  }


  AtualizarAgenda(id: string): void {

    if (this._utilService.Sessao().TipoUsuarioLogado == TipoUsuario.MasterEmpresa || this._utilService.Sessao().TipoUsuarioLogado == TipoUsuario.Administrador) {

      this.carregaCombos();


      this.serviceApi.readById(id.toString(), Endpoint.Agenda)
        .subscribe((result: Agenda) => {
          this.agenda = result;
          this.estadoForm = true;
        });

      // this.carregaCombos()
    } else {
      this._utilService.showMessage("Solicitar ao um Usuário Master para Editar os  dados da Agenda!", true);
    }
  }

  ExcluirAgenda(id: string): void {

    // if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.MasterEmpresa.toString() || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    //   {
    //     this._utilService.Popup(id, AgendaDeleteComponent,'30%','25%');
    //   }
    //   else
    //   {
    //     this._utilService.showMessage("Solicitar ao um Usuário Master para Excluir a Agenda!",true);
    //   }
  }

  AgendaSelecionada(id: any) {
    this.agendaSelecionada = 0;
    this.agendaSelecionada = id > 0 ? this.agendaSelecionada = id : 0;
  }


  public DetalhesDatas(data: any): void {
    if (this.agendaSelecionada > 0) {
      const dados = {
        agendaId: this.agendaSelecionada,
        dataSelecionada: data
      }
      this._utilService.Popup('', DetalhesDiasDisponiveisAgendaComponent, '70%', '60%', false, dados)
    }
  }

  public ExcluirServicoAgenda(id: number): void {
    let agendaAtual = this.agendaSelecionada;
    this._utilService.Popup('', PopupConfirmacaoComponent, 'auto', 'auto', true, "Tem Certeza que deseja Excluir ?")
      .subscribe(result => {
        if (result) {
          this.serviceApi.create(id, Endpoint.AgendaCatalogoServico + `/excluir/${id}`)
            .subscribe((agendaId) => {
              this._utilService.showMessage("Serviços excluido dessa agenda", true);
              this.BuscarServicosAgendaveis(agendaId)
              this.agendaSelecionada = agendaId;
            }, (err) => {
              this._utilService.showMessage(`${err}`, true);
            }, () => {
            })
        }
      })




  }

  private BuscarServicosAgendaveis(idAgenda: number): void {

    this.serviceApi.read(Endpoint.AgendaCatalogoServico + `/estabelecimento/${idAgenda}`)
      .subscribe((result) => {

        let catalogoServicos: CatalogoServico[] = result.map(x => x.catalogoServicos);

        catalogoServicos.forEach(x => {
          result.forEach(f => {
            if (f.catalogoServicosId === x.id) {
              x.id = f.id;
              return;
            }
          })
        });
        this.catalogoServicosAgenda = [...catalogoServicos.sort(function (a, b) { return a.id - b.id; })];
      })
  }
}
