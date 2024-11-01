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
  ColunasDetalhes = ['id', 'hora', 'intervalo', 'tipoHorario', 'diaDasemana', 'bloqueado', 'naoDisponivel', 'bloqueadoEmTela'];
  detalhes: HorarioAgenda[] = new Array();
  comboBloqueado: any;

  dados: any

  constructor(
    private dialogRef: MatDialogRef<DetalhesDiasDisponiveisAgendaComponent>,
    private serviceUtil: UtilService,
    private serviceApi: ServiceAllService<any>
  ) { }

  ngOnInit(): void {
    this.dados = this.dialogRef._containerInstance._config.data.object;
    this.CarregaCombos();
    this.CarregarTela();

  }



  private CarregaCombos(): void {
    this.comboBloqueado = this.serviceUtil.YesNO(true);
   
  }

  private CarregarTela(): void {
    this.serviceApi.read(Endpoint.AgendaHorarios + `/agenda/${this.dados.agendaId}`)
      .subscribe((result: HorarioAgenda[]) => {
        this.detalhes = result.filter(x => x.data == this.dados.dataSelecionada);
      });
  }


  private Refresh(): void {

    this.serviceApi.read(Endpoint.AgendaHorarios + `/agenda/${this.dados.agendaId}`)
      .subscribe((result: HorarioAgenda[]) => {
        this.detalhes = [...result.filter(x => x.data == this.dados.dataSelecionada)];
      });
  }


  public AlterarStatus(row: any): void {

    this.serviceApi.readById(row.id, Endpoint.AgendaHorarios)
      .subscribe((result: HorarioAgenda) => {

        if (!result.naoDisponivel) {
          this.serviceApi.update(row, Endpoint.AgendaHorarios)
            .subscribe(() => {
              this.Refresh();
              this.serviceUtil.showMessage("Horário da agenda bloqueado!");
            }
              , (err) => {
                this.Refresh();
              }, () => {
                this.Refresh();
              })
        } else {
          this.Refresh();
          this.serviceUtil.showMessage("O horário não pode ser alterado porque já foi agendado!");
        }
      });


  }

}
