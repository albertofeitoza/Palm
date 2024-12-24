import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CatalogoServicoCadastro } from 'src/app/models/CatalogoServico/CatalogoServico';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-produtos-empresa-cadastro',
  templateUrl: './produtos-empresa-cadastro.component.html',
  styleUrls: ['./produtos-empresa-cadastro.component.css']
})
export class ProdutosEmpresaCadastroComponent implements OnInit {

  produto: CatalogoServicoCadastro = new CatalogoServicoCadastro();
  tipoProduto: any[] = new Array();

  // id: number;
  //   dtCriacao: Date;
  //   codigoBarras: string;
  //   qrCode: string;
  //   codigo: string;
  //   qtdEstoque: number;
  //   nome: string;
  //   tipoCatalogo: number;
  //   peso: number;
  //   margem: number;
  //   valorCompra: number;
  //   valor: number;
  //   excluido: boolean;
  //   empresaId: number;



  constructor(
    public dialogRef: MatDialogRef<ProdutosEmpresaCadastroComponent>,
    private servico: UtilService,
    private serviceApi: ServiceAllService<any>
  ) { }

  ngOnInit(): void {
    this.CarregarCombos();
  }


  public fecharPopup(): void {
    this.dialogRef.close();
  }


  private CarregarCombos(): void {
    this.tipoProduto = this.servico.TipoProduto();
  }

  public CadastrarProduto():void {
    
  }

}
