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
    nome: null,
    preco: null,
    Usuarioid : null,
    Empresaid :null
  }

  constructor(private productService : ProductService,
              private router : Router,
              private utilService : UtilService,
              private route : ActivatedRoute ) { }

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });

  }
  deleteProduct():void{
  
    this.productService.delete(this.product.id).subscribe(() => {
        this.utilService.showMessage("Produto Excluído com Sucesso!")
        this.router.navigate(['/products'])
      })
    
  }

  cancel():void{
    this.router.navigate(['/products'])
  }

}


  

 



  
