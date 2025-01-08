import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Protocolo } from 'src/app/models/Protocolo/modelProtocolo';
import { Endpoint } from 'src/app/Negocio/Endpoint';
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
  colunas = ['id', 'dtCriacao', 'descricao', 'statusProtocolo','action']
  
  idSelecionado = 0;
  idPessoa = 0;


  constructor(
    private matdialogRef: MatDialogRef<ProtocolosReadComponent>,
    private servico: UtilService,
    private serviceApi: ServiceAllService<any>

  ) { }

  ngOnInit(): void {
    this.BuscarProtocolos();
    this.idPessoa = this.matdialogRef._containerInstance._config.data.object;
  }

  private BuscarProtocolos(): void {
    this.serviceApi.read(Endpoint.Protocolo + `/estabelecimento/${this.servico.Sessao().EmpresaId}`)
      .subscribe((result: Protocolo[]) => {
        this.protocolos.data = this.idPessoa > 0 ? result.filter(x => x.pessoaId === this.idPessoa) : result;

        this.protocolos.paginator = this.paginator
        this.protocolos.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Itens por página";


      })
  }

  public fecharPopup() {
    this.matdialogRef.close();
  }

  public DetalhesProtocolo(row: any) : void {

  }


  public LinhaSelecionada(row: any) : void {

  }


  
}
