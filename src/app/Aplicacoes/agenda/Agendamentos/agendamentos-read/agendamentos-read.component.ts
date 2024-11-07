import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewAgendamentos } from 'src/app/models/Agenda/modelAgendamentos';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { AgendamentosCreateComponent } from '../agendamentos-create/agendamentos-create.component';
import { DadosAgendamentoComponent } from '../dados-agendamento/dados-agendamento.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-agendamentos-read',
  templateUrl: './agendamentos-read.component.html',
  styleUrls: ['./agendamentos-read.component.css']
})
export class AgendamentosReadComponent implements OnInit {



  displayedColumns = ['id', 'horaAgendada', 'nome', 'dataNascimento',
    'telefone', 'celular', 'email', 'profissional', 'protocoloId', 'statusAgendamento', 'action']

  //agendamentos: ViewAgendamentos[] = new Array();

  selected: Number = 0;
  statusProcoloBusca = '';
  statusProtocolo: any[] = new Array();


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  agendamentos = new MatTableDataSource<ViewAgendamentos>();



  constructor(
    private servicoAgendamento: ServiceAllService<any>,
    private servico: UtilService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.statusProcoloBusca = 'Aberto'
    this.BuscarAgendamento();
    this.CarregarCombos();

  }



  private CarregarCombos(): void {
    this.statusProtocolo = this.servico.StatusProtocolo();
  }



  public BuscarAgendamento(): void {

    let data = this.datePipe.transform(new Date, 'yyyy-MM-dd')?.toString();
    let statusSelecionado = this.statusProcoloBusca;

    this.servicoAgendamento.read(Endpoint.Agendamentos + `/estabelecimento/${this.servico.Sessao().EmpresaId}`)
      .subscribe((result: ViewAgendamentos[]) => {
        this.agendamentos.data =
          [
            ...result.filter(x => data ? x.horaAgendada.toString().includes(data) && x.statusAgendamento.toLocaleLowerCase().includes(statusSelecionado.toLocaleLowerCase())
            : statusSelecionado.includes('Todos') ? result 
            : result.filter(x => x.statusAgendamento.toLocaleLowerCase().includes(statusSelecionado.toLocaleLowerCase()))

          )];
      })
    this.agendamentos.paginator = this.paginator
    this.agendamentos.sort = this.sort;
  }

  EditarAgendamento(id: any) {
    this.servico.Popup(id, DadosAgendamentoComponent, '75%', '80%', true)
      .subscribe(() => {
        this.BuscarAgendamento();
      })
  }


  ExcluirAgendamento(id: any) {

  }

  public NovoAgendamento(): void {
    this.servico.Popup("", AgendamentosCreateComponent, '70%', '80%')
      .subscribe(r => {
        this.BuscarAgendamento();
      });
  }

  selecionaLinha(id: Number) {
    this.selected = id;
  }
}
