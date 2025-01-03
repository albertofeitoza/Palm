import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AgendamentoCatalogoServicos } from 'src/app/models/Agenda/modelAgendamentoSevico';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { HorariosDisponiveis } from '../../model/HorariosDisponiveis';
import { ResponseHorariosDisponiveis } from '../../model/responseHorariosDIsponiveis';
import { HorarioAgenda } from 'src/app/models/Agenda/modelHorarioAgenda';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { EMPTY } from 'rxjs';
import { FiltroBuscaTelaAgendamento } from 'src/app/models/Filtros/filtros';
import { json } from 'body-parser';

@Component({
  selector: 'app-agendamento-selecionar-horario-agendar',
  templateUrl: './agendamento-selecionar-horario-agendar.component.html',
  styleUrls: ['./agendamento-selecionar-horario-agendar.component.css']
})
export class AgendamentoSelecionarHorarioAgendarComponent implements OnInit {

  ColunasCatalogo = ['Id', 'Nome', 'Codigo', 'Data', 'Hora'];
  ColunasHorDisponiveis = ['data', 'hora', 'diaDasemana'];
  dadosAgendamentos: AgendamentoCatalogoServicos[] = new Array();
  agendasDisponiveis: ResponseHorariosDisponiveis[] = new Array();
  filtros: FiltroBuscaTelaAgendamento = new FiltroBuscaTelaAgendamento();

  linhasSelecionadas: any[] = new Array();
  linhaSelecionada = 0;
  constructor(
    private dialogRef: MatDialogRef<AgendamentoSelecionarHorarioAgendarComponent>,
    private serverApi: ServiceAllService<any>,
    private serviceUtil: UtilService
  ) { }

  ngOnInit(): void {
    this.dadosAgendamentos = this.dialogRef._containerInstance._config.data.object
    this.filtros = this.dialogRef._containerInstance._config.data.filtros

  }

  private BuscarHorariosDisponiveis(linhaSelecionada: AgendamentoCatalogoServicos): void {

    //let idsSelecionadoss = this.dadosAgendamentos.map(x => x.Id);
    let idsSelecionados: number[] = new Array();
    idsSelecionados.push(linhaSelecionada.Id);

    this.serverApi.create(idsSelecionados, Endpoint.Agenda + `/horariosDisponiveis/${this.serviceUtil.Sessao().EmpresaId}`, JSON.stringify(this.filtros))
      .subscribe((result: ResponseHorariosDisponiveis[]) => {

        if (result && result.length > 0) {
          this.agendasDisponiveis = [...result];
        } else {
          this.serviceUtil.showMessage("Não existem horário disponível para essa seleção.")
        }
      })
  }

  public LinhaSelecionada(row: any, servicoAgenda: any, idServico: number, idAgenda: number, agendaCatalogoId: number): void {

    // let servico = servicoAgenda + ':' + row.id
    // let valida = this.linhasSelecionadas.filter(x => x.includes(servicoAgenda))[0];


    // let servico = servicoAgenda + ':' + row.id
    let valida = this.linhasSelecionadas.filter(x => x.id == row.id)[0]

    if (valida) {
      const index: number = this.linhasSelecionadas.indexOf(valida);
      if (index !== -1) {
        this.linhasSelecionadas.splice(index, 1);

        if (valida == valida)
          this.ReservarHorario(row, false, idServico, idAgenda, agendaCatalogoId);
        return;
      }
    } else {

      this.linhasSelecionadas.push(row);
      this.ReservarHorario(row, true, idServico, idAgenda, agendaCatalogoId);

    }

    // let horarioJaselecionado = this.linhasSelecionadas.filter(x => x.includes(row.id))[0]

    // if(horarioJaselecionado)  
    //   return this.serviceUtil.showMessage("você já selecionou esse horário.");


  }

  public LinhaCatalogoSelecionada(linha: any): void {

    let idHorario = this.ObterIdHorario(linha);
    if (idHorario > 0) {
      this.CancelarReservarHorario(idHorario);
      this.dadosAgendamentos.forEach(x => {

        if (x.Id == linha.Id) {
          x.Data = undefined;
          x.Hora = '';
        }

      });
    }


    this.BuscarHorariosDisponiveis(linha);

  }


  public BuscarLInhaSelecionada(row: any, servicoAgenda: any): number {
    //let servico = servicoAgenda + ':' + id

    let linha = this.linhasSelecionadas.filter(x => x.id == row.id)[0]
    if (linha) {
      return linha.id;
    }
    return 0
  }

  public ReservarHorario(row: any, bloqueado: boolean = false, idServico: number, idAgenda: number, agendaCatalogoId: number): void {
    this.serverApi.readById(row.id.toString(), Endpoint.AgendaHorarios)
      .subscribe((result: HorarioAgenda) => {

        if (result && !result.bloqueadoEmTela && !result.naoDisponivel) {
          result.bloqueadoEmTela = bloqueado;

          this.serverApi.update(result, Endpoint.AgendaHorarios)
            .subscribe(() => {
              this.serviceUtil.showMessage("Horário reservado se dentro de 15 minutos não for agendado, o horário será liberado.")
              this.AtualizarDadosAgendamento(row, bloqueado, idServico, idAgenda, agendaCatalogoId);
            });
        }
      })
  }

  private CancelarReservarHorario(id: number, bloqueado: boolean = false): void {
    this.serverApi.readById(id.toString(), Endpoint.AgendaHorarios)
      .subscribe((result: HorarioAgenda) => {
        if (result) {
          result.bloqueadoEmTela = bloqueado;
          result.naoDisponivel = bloqueado;
          this.serverApi.update(result, Endpoint.AgendaHorarios)
            .subscribe(() => {
              this.serviceUtil.showMessage("Reserva de horário ignorada.")
            });
        }
      })
  }


  private AtualizarDadosAgendamento(row: any, bloqueado: boolean, idServico: number, idAgenda: number, agendaCatalogoId: number): void {

    this.dadosAgendamentos.forEach(at => {
      if (at.Id === idServico) {
        at.IdAgenda = idAgenda;
        at.AgendaCatalogoId = agendaCatalogoId;
        at.Data = row.data;
        at.Hora = bloqueado ? row.hora : '';
        at.Dom = bloqueado && row.diaDasemana === 1 ? row.id : 0;
        at.Seg = bloqueado && row.diaDasemana === 2 ? row.id : 0;
        at.Ter = bloqueado && row.diaDasemana === 3 ? row.id : 0;
        at.Qua = bloqueado && row.diaDasemana === 4 ? row.id : 0;
        at.Qui = bloqueado && row.diaDasemana === 5 ? row.id : 0;
        at.Sex = bloqueado && row.diaDasemana === 6 ? row.id : 0;
        at.Sab = bloqueado && row.diaDasemana === 7 ? row.id : 0;

      }
    })
    this.dadosAgendamentos = [...this.dadosAgendamentos];
    this.agendasDisponiveis = new Array();
    this.agendasDisponiveis = [...this.agendasDisponiveis];
  }

  public fecharPopup(confirm: boolean) {
    if (confirm)
      this.dialogRef.close(this.dadosAgendamentos);
    else {

      this.linhasSelecionadas.forEach(can => {
        let id = Number(can.id);
        this.CancelarReservarHorario(can.id)
      });
      this.dialogRef.close();
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
}
