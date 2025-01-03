import { PopupConfirmacaoComponent } from 'src/app/components/Popups/popup-confirmacao/popup-confirmacao.component';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Protocolo } from 'src/app/models/Protocolo/modelProtocolo';
import { Pessoa } from 'src/app/models/Pessoa/Pessoa';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { Agendamentos, CatalogoAgendado } from 'src/app/models/Agenda/modelAgendamentos';
import { FiltroBuscaTelaAgendamento } from 'src/app/models/Filtros/filtros';
import { AgendamentoCatalogoServicos } from 'src/app/models/Agenda/modelAgendamentoSevico';
import { PopupSelecaoIdsComponent } from 'src/app/components/Popups/popup-selecao-ids/popup-selecao-ids.component';
import { TipoProtocolo } from 'src/app/Negocio/TipoProtocolo';
import { StatusProtocolo } from 'src/app/Negocio/StatusProtocolo';
import { CatalogoServico } from 'src/app/models/CatalogoServico/CatalogoServico';
import { AgendamentoSelecionarHorarioAgendarComponent } from './modal/agendamento-selecionar-horario-agendar/agendamento-selecionar-horario-agendar.component';
import { HorarioAgenda } from 'src/app/models/Agenda/modelHorarioAgenda';
import { MeioAberturaAgendamento } from 'src/app/Negocio/MeioAberturaAgendamento';
import { AgendamentoEditarItemAgendadoComponent } from './modal/agendamento-editar-item-agendado/agendamento-editar-item-agendado.component';
import { ItensAgendadoAtividade } from './model/atividades';
import { Unidade } from 'src/app/models/Unidade/unidadeModel';

@Component({
  selector: 'app-dados-agendamento',
  templateUrl: './dados-agendamento.component.html',
  styleUrls: ['./dados-agendamento.component.css']
})
export class DadosAgendamentoComponent implements OnInit {

  protocolo: Protocolo = new Protocolo()
  agendamento: Agendamentos = new Agendamentos();
  filtros: FiltroBuscaTelaAgendamento = new FiltroBuscaTelaAgendamento();

  dadosAgendamentos: AgendamentoCatalogoServicos[] = new Array();
  horariosPendentes = false;
  itensPendentes = 0;
  codServico: any;
  nomeServico: any;
  unidades: Unidade[] = new Array();


  displayedColumns = ['Id', 'Nome', 'Codigo', 'CodigoBarras', 'QrCode', 'Data', 'Hora', 'StatusItem', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom', 'Valor', 'action']
  idSelecionado: Number = 0;
  selected: number = 0;


  periodo: any = [
    { "id": "1", "horario": "Qualquer Horário" },
    { "id": "2", "horario": "Manhã" },
    { "id": "3", "horario": "Tarde" },
  ]

  idPessoa: number = 0;
  idTelefoneRes: number = 0;
  idTelefoneCel: number = 0;
  idContato: number = 0;
  idPeriodo: number = 0;
  idAgendamento: number = 0;
  statusAgendamento = '';
  valorTotal = 0;


  constructor(
    private dialofRef: MatDialogRef<DadosAgendamentoComponent>,
    private servicoApi: ServiceAllService<any>,
    private servico: UtilService
  ) { }

  ngOnInit(): void {

    this.idPessoa = this.dialofRef._containerInstance._config.data.object;
    this.idAgendamento = this.dialofRef.id && Number(this.dialofRef.id) > 0 ? Number(this.dialofRef.id) : 0
    if (this.idPessoa && this.idPessoa > 0) {
      this.buscaPessoa();
      this.AtualizaPeriodo();
      this.criarProtocolo();
    }
    if (this.idAgendamento && this.idAgendamento > 0) {
      this.BuscarAgendamento(this.idAgendamento);
    } else {
      this.agendamento.statusAgendamento = StatusProtocolo.Rascunho
    }

  }
  private BuscarAgendamento(idAgendamento: number): void {

    this.servicoApi.readById(idAgendamento.toString(), Endpoint.Agendamentos)
      .subscribe((result: Agendamentos) => {

        if (result) {
          this.agendamento = result;
          this.statusAgendamento = this.StatusCancelamento(result.statusAgendamento);
          this.dadosAgendamentos = new Array();
          this.protocolo.id = result.protocoloId;

          result.catalogoAgendado.forEach(dado => {
            let dadosAgendados: AgendamentoCatalogoServicos = new AgendamentoCatalogoServicos();
            dadosAgendados.Id = dado.id;
            dadosAgendados.IdAgenda = 0;
            dadosAgendados.AgendaCatalogoId = dado.agendaCatalogoId;
            dadosAgendados.Nome = dado.nome;
            dadosAgendados.Codigo = dado.codigo;
            dadosAgendados.CodigoBarras = dado.codigoBarras;
            dadosAgendados.QrCode = dado.qrCode;
            dadosAgendados.Data = dado.data;
            dadosAgendados.Hora = dado.hora;
            dadosAgendados.Seg = dado.seg;
            dadosAgendados.Ter = dado.ter;
            dadosAgendados.Qua = dado.qua;
            dadosAgendados.Qui = dado.qui;
            dadosAgendados.Sex = dado.sex;
            dadosAgendados.Sab = dado.sab;
            dadosAgendados.Dom = dado.dom;
            dadosAgendados.Valor = dado.valor;
            dadosAgendados.StatusItem = dado.statusItem;

            this.dadosAgendamentos.push(dadosAgendados);
          });

          this.dadosAgendamentos = [...this.dadosAgendamentos];
          this.itensPendentes = this.dadosAgendamentos.filter(x => x.StatusItem < 4).length;
        }

        let valores = this.dadosAgendamentos.filter(x => x.StatusItem > 3 && x.StatusItem < 6).map(v => v.Valor);
        this.SomarValores(valores);
      });
  }

  private SomarValores(valores: number[]) {
    this.valorTotal = 0;
    valores.forEach(soma => {
      this.valorTotal += soma;
    })
  }

  private StatusCancelamento(result: number): string {
    return result == 0 ? 'Rascunho' :
      result == 1 ? 'Aberto' :
        result == 2 ? 'Espera' :
          result == 3 ? 'Na Recepção' :
            result == 4 ? 'Em Atendimento' :
              result == 5 ? 'Finalizado' :
                result == 6 ? 'Cancelado' :
                  '';
  }

  private buscaPessoa(): void {

    //this.dialofRef.id
    if (this.idPessoa && this.idPessoa > 0)
      this.servicoApi.readById(this.idPessoa.toString(), Endpoint.Pessoa)
        .subscribe((result: Pessoa) => {

          this.agendamento.nome = result.nome;
          this.agendamento.responsavel = result.responsavel;
          this.agendamento.rg = result.rg;
          this.agendamento.cpf = result.cpf;
          this.agendamento.dataNascimento = result.dataNascimento;
          this.agendamento.pessoaId = result.id;


          this.agendamento.email = "email@teste.com.br";
          this.agendamento.telefone = "11-946403479";
          this.agendamento.celular = "11-946403479";


          // this.serviceTelefone.read(Endpoint.Telefone).subscribe(tel => {

          //   let telefones  = new Array()  // tel.filter(x => x.contatoId == ret.contato.id);

          //   this.idPessoa = ret.id;
          //   // this.idContato =  ret.contato.id
          //   this.idTelefoneRes = telefones!= null && telefones.filter(x => x.tipoTelefone == "1") ? Number(telefones.filter(x => x.tipoTelefone =="1").map(x => Number(x.id))) : 0;
          //   this.idTelefoneCel = telefones!= null && telefones.filter(x => x.tipoTelefone == "2") ? Number(telefones.filter(x => x.tipoTelefone =="2").map(x => Number(x.id))) : 0;

          //   this.agendamento.telefone = telefones!= null && telefones.filter(x => x.tipoTelefone == "1") ? Number(telefones.filter(x => x.tipoTelefone =="1").map(x => x.numTelefone)) : 0;
          //   this.agendamento.celular = telefones!= null && telefones.filter(x => x.tipoTelefone == "2") ? Number(telefones.filter(x => x.tipoTelefone =="2").map(x => x.numTelefone)) : 0;
          // });
        })
  }


  async criarProtocolo() {

    this.protocolo.dtCriacao = new Date;
    this.protocolo.tipoProtocolo = TipoProtocolo.Agendamento;
    this.protocolo.criadoPor = this.servico.Sessao().IdUsuario;
    this.protocolo.empresaId = this.servico.Sessao().EmpresaId;
    this.protocolo.pessoaId = Number(this.idPessoa)
    this.protocolo.statusProtocolo = StatusProtocolo.Rascunho

    await this.servicoApi.create(this.protocolo, Endpoint.Protocolo)
      .subscribe((result: Protocolo) => {
        this.protocolo = result;
      }, (err) => {
        this.servico.showMessage("Erro ao gerar protocolo.");
      })
  }

  public fecharPopup(response: boolean): void {

    if (!response) {

      if (this.protocolo && this.protocolo.id > 0 && this.idAgendamento === 0) {
        this.protocolo.statusProtocolo = StatusProtocolo.Cancelado;
        this.servicoApi.create(this.protocolo, Endpoint.Protocolo)
          .subscribe(() => {
            this.servico.showMessage("Protocolo Cancelado");
            this.LiberarHorarios(new Array());
            this.dialofRef.close();
          })

      } else
        this.dialofRef.close();

    } else {
      this.dialofRef.close(this.protocolo);
    }
  }

  public AtualizarDados(): void {
    //this.servico.Popup(this.pessoa.id.toString(), PessoaUpdateComponent, '70%' , '80%')
    alert('Telefone residencial' + this.agendamento.telefone)
    alert('Telefone residencial' + this.agendamento.celular)
  }


  AtualizaPeriodo() {

    switch (Number(this.idPeriodo)) {
      case 1:
        this.filtros.horaInicioPeriodo = "00:00"
        this.filtros.horaFimPeriodo = "23:59"

        break;

      case 2:
        this.filtros.horaInicioPeriodo = "06:00"
        this.filtros.horaFimPeriodo = "12:00"

        break;

      case 3:
        this.filtros.horaInicioPeriodo = "12:00"
        this.filtros.horaFimPeriodo = "23:59"

        break;

      default:
        this.filtros.horaInicioPeriodo = "00:00"
        this.filtros.horaFimPeriodo = "23:59"

        break;
    }
    this.buscarUnidade();
    this.filtros.unidade = 0;
  }

  private buscarUnidade(): void {

    this.servicoApi.read(Endpoint.Unidade + `/estabelecimento/${this.servico.Sessao().EmpresaId}`)
      .subscribe((result: Unidade[]) => {
        this.unidades = result
      })
  }

  selecionaLinha(id: any) {
    this.idSelecionado = 0;
    this.idSelecionado = id > 0 ? this.idSelecionado = id : 0;
  }

  AdicionarServico(event: any) {

    if (event.which === 1 || event.which === 13) {
      const dados = {
        codServico: this.codServico,
        nomeServico: this.nomeServico
      }

      this.servico.Popup("", PopupSelecaoIdsComponent, '45%', '45%', false, dados)
        .subscribe((result: CatalogoServico[]) => {
          if (result) {

            result.forEach(cat => {
              let dadosAgendamentos: AgendamentoCatalogoServicos = new AgendamentoCatalogoServicos();
              dadosAgendamentos.Id = cat.id;
              dadosAgendamentos.Nome = cat.nome;
              dadosAgendamentos.Codigo = cat.codigo;
              dadosAgendamentos.CodigoBarras = cat.codigoBarras;
              dadosAgendamentos.QrCode = cat.qrCode;
              dadosAgendamentos.Hora = '';
              dadosAgendamentos.Seg = 0;
              dadosAgendamentos.Ter = 0;
              dadosAgendamentos.Qua = 0;
              dadosAgendamentos.Qui = 0;
              dadosAgendamentos.Sex = 0;
              dadosAgendamentos.Sab = 0;
              dadosAgendamentos.Dom = 0;
              dadosAgendamentos.Valor = cat.valor
              this.dadosAgendamentos.push(dadosAgendamentos)
            });

            this.dadosAgendamentos = [...this.dadosAgendamentos];
            this.horariosPendentes = true;
          } else {
            this.servico.showMessage("Seleção Ignorada.");
          }
        });
    }
  }

  public Editar(row: AgendamentoCatalogoServicos): void {

    this.servico.Popup('', AgendamentoEditarItemAgendadoComponent, '50%', '60%', true, row.Id)
      .subscribe((result: StatusProtocolo) => {

        this.BuscarAgendamento(this.idAgendamento);

        this.servicoApi.read(Endpoint.ItensAgendados + `/agendamento/${this.idAgendamento}`)
          .subscribe((result: AgendamentoCatalogoServicos[]) => {

            if (result.filter(x => x.StatusItem > 4)) {

              this.AtualizarStatusAgendamento();

              this.AtualizarStatusProtocolo();
            }
          });
      })
  }

  private ObterIdHorario(row: AgendamentoCatalogoServicos): number {

    return row.Dom > 0 ? row.Dom
      : row.Seg > 0 ? row.Seg
        : row.Ter > 0 ? row.Ter
          : row.Qua > 0 ? row.Qua
            : row.Qui > 0 ? row.Qui
              : row.Sex > 0 ? row.Sex
                : row.Sab > 0 ? row.Sab
                  : 0;
  }

  public BuscarHorarios(): void {

    let idsSelecionados = this.dadosAgendamentos.map(x => x.Id);

    this.filtros.unidade = Number(this.filtros.unidade);

    if (idsSelecionados.length > 0) {
      this.servico.Popup('', AgendamentoSelecionarHorarioAgendarComponent, '85%', '80%', true, this.dadosAgendamentos, this.filtros)
        .subscribe((result: AgendamentoCatalogoServicos[]) => {
          this.dadosAgendamentos = [...result];
          this.horariosPendentes = this.dadosAgendamentos.filter(r => r.Hora == '').length > 0 ? true : false;
        })
    } else {
      this.servico.showMessage("Informe pelo menos 1 serviço para agendamento.")
    }
  }

  public ConfirmarAgendamento() {
    let quantAgendas = 0;
    this.agendamento.protocoloId = this.protocolo.id;
    this.agendamento.criadoPor = this.servico.Sessao().IdUsuario;
    this.agendamento.ura = MeioAberturaAgendamento.Outros
    this.agendamento.responsavel = !this.agendamento.responsavel || this.agendamento.responsavel == null ? '' : this.agendamento.responsavel;
    this.agendamento.rg = !this.agendamento.rg || this.agendamento.rg == null ? '' : this.agendamento.rg;

    let agendas = new Set(this.dadosAgendamentos.map(a => a.IdAgenda));
    this.agendamento.catalogoAgendado = new Array()

    agendas.forEach(idAgenda => {

      quantAgendas += 1;

      this.agendamento.agendaId = idAgenda
      let itens = this.dadosAgendamentos.filter(x => x.IdAgenda === idAgenda);

      itens.forEach(it => {
        let itensAgendamento: CatalogoAgendado = new CatalogoAgendado();
        itensAgendamento.id = 0;
        itensAgendamento.horarioId = this.ObterIdHorario(it);
        itensAgendamento.agendaCatalogoId = it.AgendaCatalogoId;
        itensAgendamento.agendamentoId = 0;
        itensAgendamento.nome = it.Nome;
        itensAgendamento.codigo = it.Codigo;
        itensAgendamento.codigoBarras = it.CodigoBarras;
        itensAgendamento.qrCode = it.QrCode;
        itensAgendamento.data = it.Data
        itensAgendamento.hora = it.Hora;
        itensAgendamento.seg = it.Seg;
        itensAgendamento.ter = it.Ter
        itensAgendamento.qua = it.Qua;
        itensAgendamento.qui = it.Qui;
        itensAgendamento.sex = it.Sex;
        itensAgendamento.sab = it.Sab;
        itensAgendamento.dom = it.Dom;
        itensAgendamento.valor = it.Valor;
        itensAgendamento.statusItem = StatusProtocolo.Aberto
        this.agendamento.catalogoAgendado.push(itensAgendamento)
      });
      this.CriarAgendamento(this.agendamento);
    });
    // abrir o Popup com os numeros de Protocolos criados.
    this.dialofRef.close(true);
  }

  CriarAgendamento(dadosAgendamento: Agendamentos) {
    return this.servicoApi.create(dadosAgendamento, Endpoint.Agendamentos)
      .subscribe(() => {

      });
  }


  public CancelarAgendamento(): void {

    let pendencias = this.dadosAgendamentos.filter(x => x.StatusItem > 0 && x.StatusItem < 4);

    if (pendencias.length > 0) {
      this.servico.Popup('', PopupConfirmacaoComponent, 'auto', 'auto', false, 'Tem Certeza? Ao cancelar os horários serão liberados automaticamente.')
        .subscribe(result => {
          if (result) {

            this.LiberarHorarios(pendencias);

            pendencias.forEach(x => {
              x.StatusItem = StatusProtocolo.Cancelado;
            });

            this.AtualizarStausItem(pendencias);

            this.BuscarAgendamento(this.idAgendamento);

            this.AtualizarStatusAgendamento();
            this.AtualizarStatusProtocolo();

            this.dialofRef.close(true);
          }
        })
    } else {
      this.AtualizarStatusAgendamento();
      this.AtualizarStatusProtocolo();
      return this.servico.showMessage("Não existem itens a ser cancelados")
    }
  }

  private LiberarHorarios(horarios: AgendamentoCatalogoServicos[]): void {

    horarios.forEach(item => {

      if (this.ObterIdHorario(item) > 0) {
        this.servicoApi.readById(this.ObterIdHorario(item).toString(), Endpoint.AgendaHorarios)
          .subscribe((result: HorarioAgenda) => {
            if (result) {
              result.bloqueadoEmTela = false;
              result.naoDisponivel = false;
              this.servicoApi.update(result, Endpoint.AgendaHorarios)
                .subscribe(() => { });
            }
          })
      }
    });
  }

  private AtualizarStausItem(pendencias: AgendamentoCatalogoServicos[]): void {

    pendencias.forEach(item => {

      var atividade = new ItensAgendadoAtividade();
      atividade.id = 0,
        atividade.dataCriacao = new Date,
        atividade.agendaId = null,
        atividade.agendamentosId = null,
        atividade.itensAgendadosId = item.Id,
        atividade.historico = 'Status: ' + this.servico.StatusProtocolo()[item.StatusItem].tipo

      this.servicoApi.create(atividade, Endpoint.Atividades)
        .subscribe(() => { });
    });
  }


  private AtualizarStatusAgendamento(): void {

    let pendencias = this.dadosAgendamentos.filter(x => x.StatusItem < 5)

    if (pendencias.length > 0)
      return;

    let finalizado = this.dadosAgendamentos.filter(x => x.StatusItem === 5).length
    let cancelado = this.dadosAgendamentos.filter(x => x.StatusItem === 6).length

    let status =
      finalizado > 0 ? StatusProtocolo.Finalizado
        : finalizado === 0 && cancelado > 0 ? StatusProtocolo.Cancelado
          : StatusProtocolo.Aberto;


    this.servicoApi.readById(this.idAgendamento.toString(), Endpoint.Agendamentos)
      .subscribe((result: Agendamentos) => {
        if (result) {
          result.statusAgendamento = status;
          this.servicoApi.update(result, Endpoint.Agendamentos)
            .subscribe((response) => {
              this.statusAgendamento = this.StatusCancelamento(response.statusAgendamento);
            })
        }
      })
  }

  private AtualizarStatusProtocolo(): void {

    if (this.dadosAgendamentos.filter(x => x.StatusItem < 5).length > 0)
      return;

    let finalizado = this.dadosAgendamentos.filter(x => x.StatusItem === 5).length
    let cancelado = this.dadosAgendamentos.filter(x => x.StatusItem === 6).length

    let status =
      finalizado > 0 ? StatusProtocolo.Finalizado
        : finalizado === 0 && cancelado > 0 ? StatusProtocolo.Cancelado
          : StatusProtocolo.Finalizado;

    this.servicoApi.readById(this.protocolo.id.toString(), Endpoint.Protocolo)
      .subscribe((result: Protocolo) => {
        if (result) {
          result.statusProtocolo = status;
          this.servicoApi.update(result, Endpoint.Protocolo)
            .subscribe(() => { })
        }
      });
  }
}
