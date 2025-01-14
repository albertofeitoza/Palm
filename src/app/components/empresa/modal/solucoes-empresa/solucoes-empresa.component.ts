import { SolucoesEmpresa } from 'src/app/models/Solucoes/SolucoesEmpresa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { PermissaoUsuarioSolucaoComponent } from '../permissao-usuario-solucao/permissao-usuario-solucao.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-solucoes-empresa',
  templateUrl: './solucoes-empresa.component.html',
  styleUrls: ['./solucoes-empresa.component.css']
})
export class SolucoesEmpresaComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  solucoesEmpresa = new MatTableDataSource<SolucoesEmpresa>();

  displayedColumns = ['solucaoNome', 'ativo', 'action']
  idSelecionado = 0;
  idEmpresa = 0;

  constructor(
    private dialogRef: MatDialogRef<SolucoesEmpresaComponent>,
    private servico: UtilService,
    private serviceApi: ServiceAllService<any>

  ) {

  }

  ngOnInit(): void {
    this.idEmpresa = Number(this.dialogRef.id);
    this.BuscarSolucoesEmpresa();
  }

  private BuscarSolucoesEmpresa(): void {

    this.serviceApi.read(Endpoint.SolucoesEmpresa + `/estabelecimento/${this.idEmpresa}/${0}`)
      .subscribe((result: SolucoesEmpresa[]) => {
        this.solucoesEmpresa.data = result;
      });

    this.solucoesEmpresa.paginator = this.paginator
    this.solucoesEmpresa.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "Itens por página";
  }

  selecionaLinha(id: number) { }

  public PermissaoUsuarios(row: SolucoesEmpresa): void {
    this.servico.Popup('', PermissaoUsuarioSolucaoComponent, '25%', '70%', false, row)
      .subscribe(result => {
        result = [...result]
      });
  }
}
