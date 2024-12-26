import { PopupConfirmacaoComponent } from './../../../Popups/popup-confirmacao/popup-confirmacao.component';
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

  public ExcluirProduto(id: any): void {

    this.servico.Popup('', PopupConfirmacaoComponent, 'auto', 'auto', false, 'Tem Certeza que deseja excluir o produto?')
      .subscribe(result => {
        if (result) {
          this.serviceApi.create(id, Endpoint.CatalogoServico + `/excluir/${id}`)
            .subscribe((resultPrd) => {
              this.servico.showMessage(resultPrd.mensagem);
              this.BuscarProdutosEmpresa();
            })
        }
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
