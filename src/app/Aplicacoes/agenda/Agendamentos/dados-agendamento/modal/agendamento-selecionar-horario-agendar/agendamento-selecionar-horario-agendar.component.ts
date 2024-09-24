import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AgendamentoCatalogoServicos } from 'src/app/models/Agenda/modelAgendamentoSevico';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { HorariosDisponiveis } from '../../model/HorariosDisponiveis';
import { ResponseHorariosDisponiveis } from '../../model/responseHorariosDIsponiveis';

@Component({
  selector: 'app-agendamento-selecionar-horario-agendar',
  templateUrl: './agendamento-selecionar-horario-agendar.component.html',
  styleUrls: ['./agendamento-selecionar-horario-agendar.component.css']
})
export class AgendamentoSelecionarHorarioAgendarComponent implements OnInit {

  ColunasHorDisponiveis = ['nomeAgenda', 'horaDisponivel'];

  dadosAgendamentos: AgendamentoCatalogoServicos[] = new Array();

  horariosDisponiveis: ResponseHorariosDisponiveis[] = new Array();
  // check: boolean = false;
  // id: number = 0;
  // idCatalogo: number;
  // nomeAgenda : string
  // horaDisponivel : string

  selected = 0;



  constructor(
    private dialogRef: MatDialogRef<AgendamentoSelecionarHorarioAgendarComponent>,
    private serverApi: ServiceAllService<any>,
    private serviceUtil: UtilService
  ) { }

  ngOnInit(): void {

    this.dadosAgendamentos = this.dialogRef._containerInstance._config.data.object

    this.BuscarHorariosDisponiveis();
  }




  private BuscarHorariosDisponiveis(): void {

    let idsSelecionados = this.dadosAgendamentos.map(x => x.Id);

    this.serverApi.create(idsSelecionados, Endpoint.Agenda + `/horariosDisponiveis/${this.serviceUtil.Sessao().EmpresaId}`)
      .subscribe((result: ResponseHorariosDisponiveis[]) => {
        this.horariosDisponiveis = result
      })
  }

  public ReservarHorario(row: any): void {
    alert('linha selecionada' + row)
  }

  public selecionaLinha(id: any): void {
    this.selected = id
  }


}
