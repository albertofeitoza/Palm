import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {


  product:any

  constructor(
              private utilService : UtilService,
              private serviceProduto : ServiceAllService<any>,
              public dialogRef : MatDialogRef<ProductDeleteComponent> 
              ) { }

  ngOnInit(): void {
    this.buscarProduto();
  }
  
  deleteProduct():void{
      
    // this.serviceProduto.delete(Number(this.dialogRef.id), Endpoint.ProdutoEmpresa).subscribe(() => {
    //     this.utilService.showMessage("Produto Excluído com Sucesso!")
    //   //  this.utilService.atualizaRota("products", true);
    //   })
    
  }

  buscarProduto(){
    // this.serviceProduto.readById(this.dialogRef.id , Endpoint.ProdutoEmpresa).subscribe(product => {
    //   this.product = product;
    // });
  }

  fecharPopup():void{
    this.dialogRef.close();
  }

}


  

 



  
