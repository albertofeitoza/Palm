import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { Product } from '../../../models/produtos/product.model';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product : Product = {
    id: null,
    dtCriacao : null,
    criadoPor : null,
    nome: null,
    valor : 0,
    empresaid : null,
    bloqueado : null,
  }

  constructor(
              private utilService : UtilService,
              private serviceProduto : ServiceAllService<Product>,
              public dialogRef : MatDialogRef<ProductDeleteComponent> 
              ) { }

  ngOnInit(): void {
    this.buscarProduto();
  }
  
  deleteProduct():void{
      
    this.serviceProduto.delete(Number(this.dialogRef.id), Endpoint.Produto).subscribe(() => {
        this.utilService.showMessage("Produto Excluído com Sucesso!")
      //  this.utilService.atualizaRota("products", true);
      })
    
  }

  buscarProduto(){
    this.serviceProduto.readById(this.dialogRef.id , Endpoint.Produto).subscribe(product => {
      this.product = product;
    });
  }

  fecharPopup():void{
    this.dialogRef.close();
  }

}


  

 



  
