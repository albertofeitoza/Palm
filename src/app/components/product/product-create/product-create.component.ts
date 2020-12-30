import { ServiceAllService } from './../../../services/service-all.service';
import { Usuario } from './../../../models/usuarios/modelLogin';
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
    dtCriacao : null,
    nome : null,
    preco : null,
    criadoPor : null,
    bloqueado : false,
    empresaId : null
    }

  constructor(private ProductService : ProductService,
              private utilService : UtilService,
              private router : Router,
              private cadastrarProduto : ServiceAllService<Product>
               ) { }

  ngOnInit(): void {
    
  }

  createProduct() : void {

    this.product.criadoPor  = Number(localStorage.getItem("usId"));
    this.product.empresaId = Number(localStorage.getItem("empId"));
    this.product.dtCriacao = new Date;
    this.product.bloqueado = false;
    const tipo = `${"/Produto"}`
    this.cadastrarProduto.create(this.product, tipo).subscribe(() => {
    this.utilService.showMessage('Produto Criado!');
    this.router.navigate(['products']);
      
    })
    
  }

  cancel() : void {

    this.router.navigate(['products'])
  }

  
  

}
