import { filter } from 'rxjs/operators';
import { ItensAgendadoAtividade, ItensAgendados } from './../../model/atividades';
import { ServiceAllService } from './../../../../../../services/service-all.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { UtilService } from 'src/app/services/util.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-agendamento-editar-item-agendado',
  templateUrl: './agendamento-editar-item-agendado.component.html',
  styleUrls: ['./agendamento-editar-item-agendado.component.css']
})
export class AgendamentoEditarItemAgendadoComponent implements OnInit {

  idItem = 0;
  itenAgendado: ItensAgendados = new ItensAgendados();
  motivoAlteracao = '';
  statusItemSistema = 0;

  idSelecionado = 0;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  atividades = new MatTableDataSource<ItensAgendadoAtividade>();
  statusItem: any[]

  colunas = ['id', 'dataCriacao', 'historico']



  constructor(
    private dialofRef: MatDialogRef<AgendamentoEditarItemAgendadoComponent>,
    private servicoApi: ServiceAllService<any>,
    private servico: UtilService

  ) { }

  ngOnInit(): void {
    this.idItem = Number(this.dialofRef.id);
    this.CarregaCombos();
    this.BuscarItenAgendado();
  }

  private CarregaCombos(): void {
    this.statusItem = this.servico.StatusProtocolo();
  }

  private BuscarItenAgendado(): void {

    this.servicoApi.readById(this.idItem.toString(), Endpoint.ItensAgendados)
      .subscribe((result: ItensAgendados) => {
        this.statusItemSistema = result.statusItem;
        this.itenAgendado = result;
        this.atividades.data = result.itensAgendadoAtividades;
        this.itenAgendado.statusItem = result.statusItem;

        this.atividades.paginator = this.paginator
        this.atividades.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Itens por página";
      })
  }

  public LinhaSelecionada(row: any): void {
    this.idSelecionado = row.id
  }

  public CadastrarAtividade(): void {

    var atividade = new ItensAgendadoAtividade();
    atividade.id = 0,
      atividade.dataCriacao = new Date,
      atividade.agendaId = null,
      atividade.agendamentosId = null,
      atividade.itensAgendadosId = this.itenAgendado.id,
      atividade.historico = this.motivoAlteracao != '' ?
        'Status: ' + this.servico.StatusProtocolo()[this.itenAgendado.statusItem].tipo + ' - ' + this.motivoAlteracao :
        'Status: ' + this.servico.StatusProtocolo()[this.itenAgendado.statusItem].tipo;


    if (this.statusItemSistema >= 5)
      return this.servico.showMessage('Não permitido alterar item Finalizado ou cancelado!.', true)

    if (this.itenAgendado.statusItem == this.statusItemSistema && this.motivoAlteracao == '' || this.itenAgendado.statusItem == 6 && this.motivoAlteracao == '')
      return this.servico.showMessage('Informe o motivo.', true)

    if (this.itenAgendado.statusItem < this.statusItemSistema && this.itenAgendado.statusItem != 2 && this.itenAgendado.statusItem != 3)
      return this.servico.showMessage('o Status não pode ser inferior ao status atual.', true)

    if (this.itenAgendado.statusItem === 6 && this.statusItemSistema > 3)
      return this.servico.showMessage('Esse item não pode ser cancelado porque já passou ou está na fase "Em Atendimento"', true)

    let atividadeRecepecao = this.atividades.data.filter(x => x.historico.toLocaleLowerCase().includes('na recepção')).length;

    if (atividadeRecepecao === 0 && (this.itenAgendado.statusItem) - (this.statusItemSistema) > 1 && this.itenAgendado.statusItem != 3)
      return this.servico.showMessage('Primeiramente deve passar pela recepção', true)

    if ((this.itenAgendado.statusItem) - (this.statusItemSistema) > 1 && this.statusItemSistema != 2 && this.statusItemSistema != 3)
      return this.servico.showMessage('o Status deve ser evoluido um por vez', true)

    this.SalvarAtividade(atividade);

  }
  private SalvarAtividade(atividade: ItensAgendadoAtividade) {

    this.servicoApi.create(atividade, Endpoint.Atividades)
      .subscribe(() => {

        this.servicoApi.update(this.itenAgendado, Endpoint.ItensAgendados)
          .subscribe(() => {
            this.servico.showMessage("Atividade cadastrada", false);
            this.BuscarItenAgendado();
          });
      });
  }
  AtualizarStatusItem(itenAgendado: ItensAgendados) {
    this.servicoApi.update(itenAgendado, Endpoint.ItensAgendados)
      .subscribe(() => { });
  }

  public fecharPopup(): void {
    this.dialofRef.close(this.statusItemSistema);
  }

}
