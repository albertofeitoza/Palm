import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { error } from 'console';
import { HorarioAgenda } from 'src/app/models/Agenda/modelHorarioAgenda';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-detalhes-dias-disponiveis-agenda',
  templateUrl: './detalhes-dias-disponiveis-agenda.component.html',
  styleUrls: ['./detalhes-dias-disponiveis-agenda.component.css']
})
export class DetalhesDiasDisponiveisAgendaComponent implements OnInit {

  //Horários
  ColunasDetalhes = ['id', 'hora', 'intervalo', 'tipoHorario', 'diaDasemana', 'naoDisponivel', 'bloqueadoEmTela'];
  detalhes: HorarioAgenda[] = new Array();
  comboDisponivel: any;

  dados: any

  constructor(
    private dialogRef: MatDialogRef<DetalhesDiasDisponiveisAgendaComponent>,
    private serviceUtil: UtilService,
    private serviceApi: ServiceAllService<any>
  ) { }

  ngOnInit(): void {
    this.dados = this.dialogRef._containerInstance._config.data.object;
    this.CarregaCombos()
  }



  CarregaCombos() {
    this.comboDisponivel = this.serviceUtil.YesNO();
  }

  private CarregarTela(): void {
    this.serviceApi.read(Endpoint.AgendaHorarios + `/agenda/${this.dados.agendaId}`)
      .subscribe((result: HorarioAgenda[]) => {
        this.detalhes = result.filter(x => x.data == this.dados.dataSelecionada);
      });
  }


  public AlterarStatus(row: any): void {

    this.serviceApi.update(row, Endpoint.AgendaHorarios)
      .subscribe(() => {

        this.CarregarTela();
        this.serviceUtil.showMessage("Registro atualizado com sucesso!");
      }, (err) => {
        this.CarregarTela();
        this.serviceUtil.showMessage(`Erro: ${err.message}`);
      }, () => {
        this.CarregarTela();
        this.serviceUtil.showMessage("Erro");
      })

  }


}
