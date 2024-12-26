import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CatalogoServicoCadastro } from 'src/app/models/CatalogoServico/CatalogoServico';
import { SolucoesEmpresa } from 'src/app/models/Solucoes/SolucoesEmpresa';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-produtos-empresa-cadastro',
  templateUrl: './produtos-empresa-cadastro.component.html',
  styleUrls: ['./produtos-empresa-cadastro.component.css']
})
export class ProdutosEmpresaCadastroComponent implements OnInit {

  produto: CatalogoServicoCadastro = new CatalogoServicoCadastro();
  solucoesEmpresa: SolucoesEmpresa[] = new Array();
  idEmpresa: 0;
  produtoId = 0;

  constructor(
    public dialogRef: MatDialogRef<ProdutosEmpresaCadastroComponent>,
    private servico: UtilService,
    private serviceApi: ServiceAllService<any>
  ) { }

  ngOnInit(): void {
    this.idEmpresa = this.dialogRef._containerInstance._config.data.object.idEmpresa;
    this.produtoId = this.dialogRef._containerInstance._config.data.object.idProduto;

    this.produto.margem = 0;
    this.produto.qtdEstoque = 0;
    this.produto.peso = 0;
    this.CarregarCombos();

    if(this.produtoId > 0)
      this.BuscarProduto()
  }

  public fecharPopup(): void {
    this.dialogRef.close();
  }

  private CarregarCombos(): void {
    this.serviceApi.read(Endpoint.SolucoesEmpresa + `/estabelecimento/${this.idEmpresa}/${0}`)
      .subscribe((result: SolucoesEmpresa[]) => {
        this.solucoesEmpresa = result

      });
  }

  public CadastrarProduto(): void {
    this.produto.qtdEstoque = this.produto.qtdEstoque ? this.produto.qtdEstoque : 0;
    this.produto.empresaId = this.produto.empresaId > 0 ? this.produto.empresaId  :this.idEmpresa;

    this.serviceApi.create(this.produto, Endpoint.CatalogoServico)
      .subscribe(() => {
        this.dialogRef.close('cadastro');
      });
  }

  public CalcularValorVenda(event: any): void {

    if (event.which === 13 && this.produto.valorCompra > 0 && this.produto.margem >= 0) {
      this.produto.valor = this.servico.CalcularPorcentagemValor(this.produto.valorCompra, this.produto.margem);
    }
  }

  private BuscarProduto():void{
    this.serviceApi.readById(this.produtoId.toString(), Endpoint.CatalogoServico)
    .subscribe((result : CatalogoServicoCadastro) => {
      this.produto = result;
    })
  }
}
