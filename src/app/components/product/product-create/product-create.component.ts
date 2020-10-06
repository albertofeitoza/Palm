import { Usuario } from 'src/app/models/modelLogin';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { stringify } from 'querystring';
import { UtilService } from './../../../services/util.service';
import { ProductService } from './../../../services/product.service';
import { Product } from '../../../models/produtos/product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

    product : Product = {
    nome : null,
    dtCriacao : null,
    preco : null,
    Usuarioid : null,
    Empresaid : null
    
    }

  constructor(private ProductService : ProductService,
              private utilService : UtilService,
              private router : Router ) { }

  ngOnInit(): void {
    
  }

  createProduct() : void {

console.log(localStorage.getItem("usId"))

    this.product.Usuarioid  = Number(localStorage.getItem("usId"));
    this.product.Empresaid = Number(localStorage.getItem("empId"));
    this.product.dtCriacao = new Date;

    
    this.ProductService.create(this.product).subscribe(() => {
        this.utilService.showMessage('Produto Criado!');
        this.router.navigate(['products']);
      
    })
    
  }

  cancel() : void {

    this.router.navigate(['products'])
  }

  
  

}
