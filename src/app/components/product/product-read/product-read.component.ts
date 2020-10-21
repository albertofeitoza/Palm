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

displayedColumns = ['id','nome', 'preco','action']  

  constructor(private serviceProduto : ServiceAllService<Product>
             ) { }

  ngOnInit(): void {
       
      const tipo = `${"/Produto"}`;
      this.serviceProduto.read(tipo).subscribe(products => {
        this.products = products;
        
      })
    
    
  }

}
