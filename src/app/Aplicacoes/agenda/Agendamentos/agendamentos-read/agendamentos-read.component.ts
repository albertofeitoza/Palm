import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewAgendamentos } from 'src/app/models/Agenda/modelAgendamentos';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { AgendamentosCreateComponent } from '../agendamentos-create/agendamentos-create.component';
import { DadosAgendamentoComponent } from '../dados-agendamento/dados-agendamento.component';

@Component({
  selector: 'app-agendamentos-read',
  templateUrl: './agendamentos-read.component.html',
  styleUrls: ['./agendamentos-read.component.css']
})
export class AgendamentosReadComponent implements OnInit {


  displayedColumns = ['id', 'horaAgendada', 'nome', 'dataNascimento',
    'telefone', 'celular', 'email', 'profissional', 'protocoloId', 'statusAgendamento', 'action']

  agendamentos: ViewAgendamentos[] = new Array();

  selected: Number = 0;

  constructor(
    private servicoAgendamento: ServiceAllService<any>,
    private servico: UtilService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.buscarAgendamento();

  }

  public buscarAgendamento(): void {

    let data = this.datePipe.transform(new Date, 'yyyy-MM-dd')?.toString();

    this.servicoAgendamento.read(Endpoint.Agendamentos + `/estabelecimento/${this.servico.Sessao().EmpresaId}`)
      .subscribe((result: ViewAgendamentos[]) => {
        this.agendamentos = [...result.filter(x => data ? x.horaAgendada.toString().includes(data) : result)];
      })

  }

  EditarAgendamento(id: any) {
    this.servico.Popup(id, DadosAgendamentoComponent, '75%', '80%', true)
      .subscribe(result => {
        this.buscarAgendamento();
      })
  }


  ExcluirAgendamento(id: any) {

  }

  public NovoAgendamento(): void {
    this.servico.Popup("", AgendamentosCreateComponent, '70%', '80%')
      .subscribe(r => {
        this.buscarAgendamento();
      });
  }

  selecionaLinha(id: Number) {
    this.selected = id;
  }
}
