import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {


  product: any

  constructor(
              private utilService : UtilService,
              private ProdutoService : ServiceAllService<any>,
              public matdialogRef : MatDialogRef<ProductUpdateComponent>,
              private route : Router
              ) { }


  ngOnInit(): void {
    
    this.buscarProduto();
   
  }

  updateProduct(): void {
    // this.product.criadoPor  = Number(localStorage.getItem("usId"));
    //   this.ProdutoService.update(this.product, Endpoint.ProdutoEmpresa).subscribe(() => {
    //   this.utilService.showMessage("Produto Atualizado com Sucesso!")
    //   this.utilService.atualizaRota("produtoempresa", true);
    //   this.fecharPopup();
    // })

  }

  fecharPopup(): void {
    
    this.matdialogRef.close();
   
  }
  buscarProduto() : void {
      // this.ProdutoService.readById(this.matdialogRef.id, Endpoint.ProdutoEmpresa).subscribe(product => {
      //     this.product = product;
      // })
  }  

}
