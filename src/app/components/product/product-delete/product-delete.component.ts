import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { Product } from '../../../models/produtos/product.model';
import { Component, OnInit } from '@angular/core';

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
    empresaId : null,
    bloqueado : null,
  }

  constructor(private productService : ProductService,
              private router : Router,
              private utilService : UtilService,
              private route : ActivatedRoute,
              private deleteProduto : ServiceAllService<Product> ) { }

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });

  }
  deleteProduct():void{
      this.deleteProduto.delete(this.product.id, Endpoint.Produto).subscribe(() => {
        this.utilService.showMessage("Produto Excluído com Sucesso!")
        this.router.navigate(['/products'])
      })
    
  }

  cancel():void{
    this.router.navigate(['/products'])
  }

}


  

 



  
