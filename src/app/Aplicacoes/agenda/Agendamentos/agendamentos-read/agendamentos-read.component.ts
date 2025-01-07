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

  dataFiltro: Date;

  selected: Number = 0;
  statusProcoloBusca = 0;
  statusProtocolo: any[] = new Array();
  buscaProtocolo = 0;


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  agendamentos = new MatTableDataSource<ViewAgendamentos>();



  constructor(
    private servicoAgendamento: ServiceAllService<any>,
    private servico: UtilService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.statusProcoloBusca = 1;
    this.BuscarAgendamento();
    this.CarregarCombos();
    this.dataFiltro = new Date
    this.statusProcoloBusca = 1;
  }

  private CarregarCombos(): void {
    this.statusProtocolo = this.servico.StatusProtocolo();
  }

  public BuscarAgendamento(): void {

    let data = this.dataFiltro ? this.servico.DataSistemaFront(this.dataFiltro).toString().substring(0, 10) : this.dataFiltro;

    this.servicoAgendamento.read(Endpoint.Agendamentos + `/estabelecimento/${this.servico.Sessao().EmpresaId}`)
      .subscribe((result: ViewAgendamentos[]) => {
        let filters =
          result.filter(filter =>
            this.statusProcoloBusca === 0 && !this.dataFiltro ? filter
              : this.statusProcoloBusca === 0 && this.dataFiltro ? filter.horaAgendada.toString().includes(data)

                : this.statusProcoloBusca === 1 && this.dataFiltro ? filter.horaAgendada.toString().includes(data) && filter.statusAgendamento === 'Aberto'
                  : this.statusProcoloBusca === 1 && !this.dataFiltro ? filter.statusAgendamento === 'Aberto'

                    : this.statusProcoloBusca === 2 && this.dataFiltro ? filter.horaAgendada.toString().includes(data) && filter.statusAgendamento === 'Espera'
                      : this.statusProcoloBusca === 2 && !this.dataFiltro ? filter.statusAgendamento === 'Espera'

                        : this.statusProcoloBusca === 3 && this.dataFiltro ? filter.horaAgendada.toString().includes(data) && filter.statusAgendamento === 'NaRecepcao'
                          : this.statusProcoloBusca === 3 && !this.dataFiltro ? filter.statusAgendamento === 'NaRecepcao'

                            : this.statusProcoloBusca === 4 && this.dataFiltro ? filter.horaAgendada.toString().includes(data) && filter.statusAgendamento === 'EmAtendimento'
                              : this.statusProcoloBusca === 4 && !this.dataFiltro ? filter.statusAgendamento === 'EmAtendimento'

                                : this.statusProcoloBusca === 5 && this.dataFiltro ? filter.horaAgendada.toString().includes(data) && filter.statusAgendamento === 'Finalizado'
                                  : this.statusProcoloBusca === 5 && !this.dataFiltro ? filter.statusAgendamento === 'Finalizado'

                                    : this.statusProcoloBusca === 6 && this.dataFiltro ? filter.horaAgendada.toString().includes(data) && filter.statusAgendamento === 'Cancelado'
                                      : this.statusProcoloBusca === 6 && !this.dataFiltro ? filter.statusAgendamento === 'Cancelado'
                                        : null);

        filters = this.buscaProtocolo > 0 ? filters.filter(x => x.protocoloId === Number(this.buscaProtocolo)) : filters;

        this.agendamentos.data = [...filters];
      })
    this.agendamentos.paginator = this.paginator
    this.agendamentos.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "Itens por página";
  }

  EditarAgendamento(id: any) {
    this.servico.Popup(id, DadosAgendamentoComponent, '75%', '83%', true)
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
