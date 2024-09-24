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
import { CatalogoServico } from 'src/app/models/CatalogoServico/CatalogoServico';
import { AgendamentoSelecionarHorarioAgendarComponent } from './modal/agendamento-selecionar-horario-agendar/agendamento-selecionar-horario-agendar.component';

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
    private servicoApi: ServiceAllService<any>,
    private servico: UtilService
  ) { }

  ngOnInit(): void {
    this.buscaPessoa();
    this.AtualizaPeriodo();
    this.criarProtocolo();

  }

  private buscaPessoa(): void {

    this.servicoApi.readById(this.dialofRef.id, Endpoint.Pessoa)
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

    this.servicoApi.create(this.protocolo, Endpoint.Protocolo)
      .subscribe((result: Protocolo) => {
        this.protocolo = result;
      })
  }

  public fecharPopup(response: boolean): void {

    if (!response) {
      this.protocolo.statusProtocolo = StatusProtocolo.Cancelado;
      this.servicoApi.create(this.protocolo, Endpoint.Protocolo)
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


      //this.dadosAgendamentos.push();

      this.servico.Popup("", PopupSelecaoIdsComponent, '45%', '45%', false, dados)
        .subscribe((result: CatalogoServico[]) => {
          if (result) {
            let retorno = result;

            let dadosselecionados: AgendamentoCatalogoServicos[] = new Array()

            result.forEach(cat => {
              let dadosAgendamentos: AgendamentoCatalogoServicos = new AgendamentoCatalogoServicos();

              dadosAgendamentos.Id = cat.id;
              dadosAgendamentos.Nome = cat.nome;
              dadosAgendamentos.CodigoBarras = cat.codigoBarras;
              dadosAgendamentos.QrCode = cat.qrCode;
              dadosAgendamentos.Codigo = cat.codigo;
              dadosAgendamentos.Valor = cat.valor

              //dadosselecionados.push(dadosAgendamentos);
              this.dadosAgendamentos.push(dadosAgendamentos)
            });

            this.dadosAgendamentos = [...this.dadosAgendamentos];

            ////agendar


            //   export class AgendamentoCatalogoServicos {

            //     Id: number
            //     Nome : string
            //     CodigoBarras : string 
            //     QrCode : string  
            //     Codigo : string 
            //     Valor : number

            // }

          } else {
            this.servico.showMessage("Seleção Ignorada.");
          }
        });
    }


  }

  public Remover(row: any): void {


    const index: number = this.dadosAgendamentos.indexOf(row);
    if (index !== -1) {
      this.dadosAgendamentos.splice(index, 1);
      this.dadosAgendamentos = [...this.dadosAgendamentos];
    }
  }



  private CadastrarAgendamento(): void {

    let agendamento: Agendamentos = new Agendamentos();

    agendamento.id = 0;

  }

  public BuscarHorarios(): void {

    let idsSelecionados = this.dadosAgendamentos.map(x => x.Id);

    if (idsSelecionados.length > 0) {
      this.servico.Popup('', AgendamentoSelecionarHorarioAgendarComponent, 'auto', 'auto', false, this.dadosAgendamentos)
    } else {
      this.servico.showMessage("Informe pelo menos 1 serviço para agendamento.")
    }
  }
}
