import { CatalogoServico } from 'src/app/models/CatalogoServico/CatalogoServico';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ProdutosEmpresaCadastroComponent } from './modal/produtos-empresa-cadastro/produtos-empresa-cadastro.component';

@Component({
  selector: 'app-produtos-empresa-read',
  templateUrl: './produtos-empresa-read.component.html',
  styleUrls: ['./produtos-empresa-read.component.css']
})
export class ProdutosEmpresaReadComponent implements OnInit {


  produtosEmpresa: CatalogoServico[] = new Array();

  displayedColumns = ['id', 'codigoBarras', 'qrCode', 'codigo', 'qtdEstoque', 'nome', 'tipoCatalogo', 'peso', 'margem', 'valorCompra', 'valor', 'excluido', 'action']

  // id: number;
  // dtCriacao: Date;
  // codigoBarras: string;
  // qrCode: string;
  // codigo: string;
  // qtdEstoque: number;
  // nome: string;
  // tipoCatalogo: number;
  // peso: number;
  // margem: number;
  // valorCompra: number;
  // valor: number;
  // excluido: boolean;
  // empresaId: number;


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
        this.produtosEmpresa = result;
      });
  }

  selecionaLinha(id: number) { }

  public EditarProduto(arg0: any): void {
    throw new Error('Method not implemented.');
  }

  public ExcluirProduto(_t152: any): void {
    throw new Error('Method not implemented.');
  }

  public BuscarProdutos(): void {
    throw new Error('Method not implemented.');
  }

  public CadastrarProduto(): void {
    this.servico.Popup('', ProdutosEmpresaCadastroComponent, '65%', '55%')
      .subscribe(result => {
        if(result === 'cadastro')
          this.servico.showMessage("Produto Cadastrado com sucesso!")

        if(result === 'atualizar')
          this.servico.showMessage("Produto alterado com sucesso!")

        this.BuscarProdutosEmpresa();

      })
  }

}
