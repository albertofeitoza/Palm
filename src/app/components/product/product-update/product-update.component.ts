import { Endpoint } from './../../../Negocio/Endpoint';

import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { Product } from '../../../models/produtos/product.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

product: Product = {
    id : null,
    dtCriacao : null,
    criadoPor : null,
    nome: null,
    valor: 0,
    empresaid :null,
    bloqueado : null
  }
  

  constructor(
              private router: Router,
              private utilService : UtilService,
              private route: ActivatedRoute,
              private ProdutoService : ServiceAllService<Product>
              ) { }


  ngOnInit(): void {
    
    this.buscarProduto();
   
  }

  updateProduct(): void {
    this.product.criadoPor  = Number(localStorage.getItem("usId"));
      this.ProdutoService.update(this.product, Endpoint.Produto).subscribe(() => {
      this.utilService.showMessage("Produto Atualizado com Sucesso!")
      this.router.navigate(['/products'])
    })

  }

  cancel(): void {
    this.router.navigate(['/products'])

  }
  buscarProduto() : void {

    const id = this.route.snapshot.paramMap.get('id')
      this.ProdutoService.readById(id, Endpoint.Produto).subscribe(product => {
          this.product = product;
      })
  }  

}
