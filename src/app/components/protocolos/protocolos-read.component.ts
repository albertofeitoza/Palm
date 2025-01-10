import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DadosAgendamentoComponent } from 'src/app/Aplicacoes/agenda/Agendamentos/dados-agendamento/dados-agendamento.component';
import { Protocolo } from 'src/app/models/Protocolo/modelProtocolo';
import { TipoAplicacao } from 'src/app/Negocio/Aplicacao';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { TipoCatalogo } from 'src/app/Negocio/TipoCatalogo';
import { TipoProtocolo } from 'src/app/Negocio/TipoProtocolo';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-protocolos-read',
  templateUrl: './protocolos-read.component.html',
  styleUrls: ['./protocolos-read.component.css']
})
export class ProtocolosReadComponent implements OnInit {

  //protocolos: Protocolo[] = new Array();


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  protocolos = new MatTableDataSource<Protocolo>();
  colunas = ['id', 'dtCriacao', 'nome', 'descricao', 'descricaoStatusProtocolo', 'action']

  idSelecionado = 0;
  idPessoa = 0;
  txtBusca = '';


  constructor(
    private matdialogRef: MatDialogRef<ProtocolosReadComponent>,
    private servico: UtilService,
    private serviceApi: ServiceAllService<any>

  ) { }

  ngOnInit(): void {
    this.BuscarProtocolos();
    this.idPessoa = this.matdialogRef._containerInstance._config.data.object;
    this.txtBusca = '';
  }

  private BuscarProtocolos(): void {
    this.serviceApi.read(Endpoint.Protocolo + `/estabelecimento/${this.servico.Sessao().EmpresaId}`)
      .subscribe((result: Protocolo[]) => {
        let response = this.idPessoa > 0 ? result.filter(x => x.pessoaId === this.idPessoa) : result;

        this.protocolos.data = this.txtBusca != '' ?
          response.filter(x => x.id.toString() == this.txtBusca || x.nome.toLowerCase().includes(this.txtBusca.toLowerCase()))
          : response;

        this.protocolos.paginator = this.paginator
        this.protocolos.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Itens por página";
        this.txtBusca = '';
      })
  }

  public fecharPopup() {
    this.matdialogRef.close();
  }

  public DetalhesProtocolo(row: Protocolo): void {

    if (row.idServico > 0) {
      this.servico.Popup(row.idServico, DadosAgendamentoComponent, '75%', '83%', true, row.pessoaId)
        .subscribe(result => {
          if (result)
            this.matdialogRef.close();
        });
    } else
      this.servico.showMessage("Esse Protocolo foi ignorado na Abertura", true);

  }


  public LinhaSelecionada(row: any): void {

  }

  public BuscarProtocolo(event: any): void {
    if (event.which === 1 || event.which === 13) {
      this.BuscarProtocolos();
    }
  }

}
