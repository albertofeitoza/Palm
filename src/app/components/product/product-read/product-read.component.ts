import { stringify } from 'querystring';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Router } from '@angular/router';
import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/produtos/product.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {



products: Product[]

displayedColumns = ['id','nome', 'valor','empresaid','bloqueado','action']  

  constructor(private router : Router,
              private serviceProduto : ServiceAllService<Product>,
              private serviceEmpresa : ServiceAllService<Empresa>
             ) { }

  ngOnInit(): void {
      this.buscarProduto()
  }

  navigateToProdutoCreate() : void {
    this.router.navigate(['products/create'])
  }

  buscarProduto() : void {

    this.serviceProduto.read(Endpoint.Produto).subscribe(product => {
        product = product;

        this.products = new Array();

        product.forEach(element => {
          
            this.serviceEmpresa.readById(element.empresaid.toString(), Endpoint.Empresa).subscribe(e => {
              e = e;
              if (e)
                element.empresaid = e.razaoSocial;
            })
            this.products.push(element)
        });
    })
  }
}
