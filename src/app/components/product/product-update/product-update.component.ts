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
    id: null,
    dtCriacao : null,
    nome: null,
    preco: null,
    Usuarioid : null,
    Empresaid :null
    

  }

  constructor(private productService: ProductService,
    private router: Router,
    private utilService : UtilService,
    private route: ActivatedRoute,
    private updateProduto : ServiceAllService<Product>) { }


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });

  }

  updateProduct(): void {
    this.product.Usuarioid  = Number(localStorage.getItem("usId"));
    this.product.Empresaid = Number(localStorage.getItem("empId"));
    //this.product.dtCriacao = new Date;
    const tipo = `${"/Produto"}`;
   // this.productService.update(this.product).subscribe(() => {
      this.updateProduto.update(this.product, tipo).subscribe(() => {
      this.utilService.showMessage("Produto Atualizado com Sucesso!")
      this.router.navigate(['/products'])
    })

  }

  cancel(): void {
    this.router.navigate(['/products'])

  }

}
