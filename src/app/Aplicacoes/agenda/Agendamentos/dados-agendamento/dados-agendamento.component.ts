import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Protocolo } from 'src/app/models/Protocolo/modelProtocolo';
import { Pessoa } from 'src/app/models/Pessoa/Pessoa';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { Agendamentos } from 'src/app/models/Agenda/modelAgendamentos';
import { Telefone } from 'src/app/models/Telefone/telefoneModel';
import { map } from 'rxjs';
import { FormatListNumberedRtlOutlined } from '@material-ui/icons';
import { FiltroBuscaTelaAgendamento } from 'src/app/models/Filtros/filtros';
import { AgendamentoCatalogoServicos } from 'src/app/models/Agenda/modelAgendamentoSevico';
import { PopupSelecaoIdsComponent } from 'src/app/components/Popups/popup-selecao-ids/popup-selecao-ids.component';
import { Contato } from 'src/app/models/contato/modelContato';
import { TipoProtocolo } from 'src/app/Negocio/TipoProtocolo';
import { StatusProtocolo } from 'src/app/Negocio/StatusProtocolo';

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

  codServico: any;
  nomeServico: any;


  displayedColumns = ['Id', 'Nome', 'Codigo', 'CodigoBarras', 'QrCode', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom', 'Valor', 'action']
  idSelecionado: Number = 0;
  selected: number = 0;


  periodo: any = [
    { "id": "1", "horario": "Qualquer Horário" },
    { "id": "2", "horario": "Manhã" },
    { "id": "3", "horario": "Tarde" },
  ]

  idPessoa: Number
  idTelefoneRes: Number
  idTelefoneCel: Number
  idContato: Number

  idPeriodo: Number

  constructor(
    private dialofRef: MatDialogRef<DadosAgendamentoComponent>,
    private servicoProtocolo: ServiceAllService<Protocolo>,
    private servicePessoa: ServiceAllService<Pessoa>,
    private serviceTelefone: ServiceAllService<Telefone>,
    private servico: UtilService
  ) { }

  ngOnInit(): void {
    this.buscaPessoa();
    this.AtualizaPeriodo();
    this.criarProtocolo();

  }

  private buscaPessoa(): void {

    this.servicePessoa.readById(this.dialofRef.id, Endpoint.Pessoa)
      .subscribe((result: Pessoa) => {

        this.agendamento.nome = result.nome;
        this.agendamento.responsavel = result.responsavel;
        this.agendamento.rg = result.rg;
        this.agendamento.cpf = result.cpf;
        this.agendamento.dataNascimento = result.dataNascimento;


        // // this.agendamento.email = ret.contato.email

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


  private criarProtocolo(): void {

    this.protocolo.dtCriacao = new Date;
    this.protocolo.tipoProtocolo = TipoProtocolo.Agendamento;
    this.protocolo.criadoPor = this.servico.Sessao().IdUsuario;
    this.protocolo.empresaId = this.servico.Sessao().EmpresaId;
    this.protocolo.pessoaId = Number(this.dialofRef.id)
    this.protocolo.statusProtocolo = StatusProtocolo.Rascunho

    this.servicoProtocolo.create(this.protocolo, Endpoint.Protocolo)
      .subscribe((result: Protocolo) => {
        this.protocolo = result;
      })
  }


  fecharPopup(response: boolean) {

    if (!response) {
      this.protocolo.statusProtocolo = StatusProtocolo.Cancelado;
      this.servicoProtocolo.create(this.protocolo, Endpoint.Protocolo)
        .subscribe(() => {
          this.servico.showMessage("Protocolo Cancelado");
          this.dialofRef.close();
        })

    } else {
      this.dialofRef.close(this.protocolo);
    }
  }

  AtualizarDados() {
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

  Atender(id: any) {
    alert('Realizar atendimento.')

    // Ao atender Guardar Numero de atendimento. e guardar os dados na Faturamento

  }

  selecionaLinha(id: any) {
    this.idSelecionado = 0;
    this.idSelecionado = id > 0 ? this.idSelecionado = id : 0;
  }

  AdicionarServico(event: any) {

    this.servico.Popup("", PopupSelecaoIdsComponent, '45%', '45%')
      .subscribe(result => {
        if (result) {
          let retorno = result;


          ////agendar

          


        } else {
          this.servico.showMessage("Seleção Ignorada.");
        }
      });
  }

  private CadastrarAgendamento(): void {

    let agendamento: Agendamentos = new Agendamentos();

    agendamento.id = 0;

  }
}
