import { PopupConfirmacaoComponent } from './../../../Popups/popup-confirmacao/popup-confirmacao.component';
import { CatalogoServico } from 'src/app/models/CatalogoServico/CatalogoServico';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ProdutosEmpresaCadastroComponent } from './modal/produtos-empresa-cadastro/produtos-empresa-cadastro.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-produtos-empresa-read',
  templateUrl: './produtos-empresa-read.component.html',
  styleUrls: ['./produtos-empresa-read.component.css']
})
export class ProdutosEmpresaReadComponent implements OnInit {


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  produtosEmpresa = new MatTableDataSource<CatalogoServico>();


  // produtosEmpresa: CatalogoServico[] = new Array();

  displayedColumns = ['id', 'codigoBarras', 'qrCode', 'codigo', 'qtdEstoque', 'nome', 'tipoCatalogo', 'peso', 'margem', 'valorCompra', 'valor', 'excluido', 'action']

  idSelecionado = 0;
  idEmpresa = 0;

  constructor(
    private dialogRef: MatDialogRef<ProdutosEmpresaReadComponent>,
    private servico: UtilService,
    private serviceApi: ServiceAllService<any>
  ) { }

  ngOnInit(): void {
    this.idEmpresa = Number(this.dialogRef.id);
    this.BuscarProdutosEmpresa();
  }

  private BuscarProdutosEmpresa(): void {

    this.serviceApi.read(Endpoint.CatalogoServico + `/estabelecimento/${this.idEmpresa}/${this.idEmpresa}`)
      .subscribe((result: CatalogoServico[]) => {
        this.produtosEmpresa.data = result;
      });

    this.produtosEmpresa.paginator = this.paginator
    this.produtosEmpresa.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "Itens por página";


  }

  selecionaLinha(id: number) { }

  public EditarProduto(id: any): void {

    const request = {
      idEmpresa: this.idEmpresa,
      idProduto: id
    }

    this.servico.Popup('', ProdutosEmpresaCadastroComponent, '40%', '87%', true, request)
      .subscribe(result => {

        if (result === 'atualizar')
          this.servico.showMessage("Produto alterado com sucesso!")

        this.BuscarProdutosEmpresa();
      })
  }


  public BuscarProdutos(): void {
    throw new Error('Method not implemented.');
  }

  public CadastrarProduto(): void {

    const request = {
      idEmpresa: this.idEmpresa,
      idProduto: 0
    }

    this.servico.Popup('', ProdutosEmpresaCadastroComponent, '40%', '83%', true, request)
      .subscribe(result => {
        if (result === 'cadastro')
          this.servico.showMessage("Produto Cadastrado com sucesso!")

        this.BuscarProdutosEmpresa();
      })
  }

}
