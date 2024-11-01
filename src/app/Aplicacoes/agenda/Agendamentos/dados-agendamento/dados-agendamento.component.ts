import { PopupConfirmacaoComponent } from 'src/app/components/Popups/popup-confirmacao/popup-confirmacao.component';
import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Protocolo } from 'src/app/models/Protocolo/modelProtocolo';
import { Pessoa } from 'src/app/models/Pessoa/Pessoa';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { Agendamentos, CatalogoAgendado } from 'src/app/models/Agenda/modelAgendamentos';
import { Telefone } from 'src/app/models/Telefone/telefoneModel';
import { map } from 'rxjs';
import { FormatListNumberedRtlOutlined } from '@material-ui/icons';
import { FiltroBuscaTelaAgendamento } from 'src/app/models/Filtros/filtros';
import { AgendamentoCatalogoServicos } from 'src/app/models/Agenda/modelAgendamentoSevico';
import { PopupSelecaoIdsComponent } from 'src/app/components/Popups/popup-selecao-ids/popup-selecao-ids.component';
import { Contato } from 'src/app/models/contato/modelContato';
import { TipoProtocolo } from 'src/app/Negocio/TipoProtocolo';
import { StatusProtocolo } from 'src/app/Negocio/StatusProtocolo';
import { CatalogoServico } from 'src/app/models/CatalogoServico/CatalogoServico';
import { AgendamentoSelecionarHorarioAgendarComponent } from './modal/agendamento-selecionar-horario-agendar/agendamento-selecionar-horario-agendar.component';
import { HorarioAgenda } from 'src/app/models/Agenda/modelHorarioAgenda';
import { MeioAberturaAgendamento } from 'src/app/Negocio/MeioAberturaAgendamento';
import { promises } from 'fs';

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
  codServico: any;
  nomeServico: any;


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
            dadosAgendados.Valor = dado.Valor;
            dadosAgendados.StatusItem = dado.statusItem;

            this.dadosAgendamentos.push(dadosAgendados);
          });
          this.dadosAgendamentos = [...this.dadosAgendamentos];
        }
      });
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


  private criarProtocolo(): boolean {

    this.protocolo.dtCriacao = new Date;
    this.protocolo.tipoProtocolo = TipoProtocolo.Agendamento;
    this.protocolo.criadoPor = this.servico.Sessao().IdUsuario;
    this.protocolo.empresaId = this.servico.Sessao().EmpresaId;
    this.protocolo.pessoaId = Number(this.idPessoa)
    this.protocolo.statusProtocolo = StatusProtocolo.Rascunho

    this.servicoApi.create(this.protocolo, Endpoint.Protocolo)
      .subscribe((result: Protocolo) => {
        this.protocolo = result;
        return true;
      }, (err) => {
        return false;
      })
    return false;
  }

  public fecharPopup(response: boolean): void {
    
    if (!response) {

      if (this.protocolo && this.protocolo.id > 0 && this.idAgendamento === 0) {
        this.protocolo.statusProtocolo = StatusProtocolo.Cancelado;
        this.servicoApi.create(this.protocolo, Endpoint.Protocolo)
          .subscribe(() => {
            this.servico.showMessage("Protocolo Cancelado");
            this.LiberarHorarios();
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
        this.filtros.data = new Date
        break;

      case 2:
        this.filtros.horaInicioPeriodo = "06:00"
        this.filtros.horaFimPeriodo = "12:00"
        this.filtros.data = new Date
        break;

      case 3:
        this.filtros.horaInicioPeriodo = "12:00"
        this.filtros.horaFimPeriodo = "20:00"
        this.filtros.data = new Date
        break;

      default:
        this.filtros.horaInicioPeriodo = "00:00"
        this.filtros.horaFimPeriodo = "23:59"
        this.filtros.data = new Date
        break;
    }

  }

  buscarUnidade(event: any) {
    if (event.which === 13) {

    }

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

  public Remover(row: AgendamentoCatalogoServicos): void {

    const index: number = this.dadosAgendamentos.indexOf(row);
    if (index !== -1) {
      this.dadosAgendamentos.splice(index, 1);
      this.dadosAgendamentos = [...this.dadosAgendamentos];
      let id = this.ObterIdHorario(row)

      if (id && id > 0) {
        this.servicoApi.readById(id.toString(), Endpoint.AgendaHorarios)
          .subscribe((result: HorarioAgenda) => {
            if (result) {
              result.bloqueadoEmTela = false;
              result.naoDisponivel = this.agendamento.id > 0 ? false : result.naoDisponivel;
              this.servicoApi.update(result, Endpoint.AgendaHorarios)
                .subscribe(() => { });
            }
          })
      }
      this.horariosPendentes = this.dadosAgendamentos.filter(r => r.Hora == '').length > 0 ? true : false;
    }
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

    if (idsSelecionados.length > 0) {
      this.servico.Popup('', AgendamentoSelecionarHorarioAgendarComponent, '85%', '80%', true, this.dadosAgendamentos)
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
        itensAgendamento.Valor = it.Valor;
        itensAgendamento.statusItem = StatusProtocolo.Aberto

        this.agendamento.catalogoAgendado.push(itensAgendamento)
      });

      if (quantAgendas === 1) {
        this.CriarAgendamento(this.agendamento);
      }
      else {
        if (this.criarProtocolo()){
          this.CriarAgendamento(this.agendamento);
        }
          
      }

    });
    this.dialofRef.close(true);
  }

  async CriarAgendamento(dadosAgendamento: Agendamentos) {
    return await this.servicoApi.create(dadosAgendamento, Endpoint.Agendamentos)
      .subscribe(() => { });
  }


  public CancelarAgendamento(): void {

    this.servico.Popup('', PopupConfirmacaoComponent, 'auto', 'auto', false, 'Tem Certeza? Ao cancelar os horários serão liberados automaticamente!')
      .subscribe(result => {
        if (result) {
          this.LiberarHorarios();
          this.AtualizarStatusAgendamento(StatusProtocolo.Cancelado);
          this.AtualizarStatusProtocolo(StatusProtocolo.Cancelado);
          this.dialofRef.close(true);
        }
      })
  }

  private LiberarHorarios(): void {

    this.dadosAgendamentos.forEach(pro => {
      if (this.ObterIdHorario(pro) > 0) {
        this.servicoApi.readById(this.ObterIdHorario(pro).toString(), Endpoint.AgendaHorarios)
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

  private AtualizarStatusAgendamento(status: StatusProtocolo): void {
    this.servicoApi.readById(this.idAgendamento.toString(), Endpoint.Agendamentos)
      .subscribe((result: Agendamentos) => {
        if (result) {
          result.statusAgendamento = status;
          this.servicoApi.update(result, Endpoint.Agendamentos)
            .subscribe((response) => {
              this.statusAgendamento = this.StatusCancelamento(response.statusAgendamento);
            })
        }
      });
  }

  private AtualizarStatusProtocolo(status: StatusProtocolo): void {
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
