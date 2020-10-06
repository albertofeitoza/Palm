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

  constructor(private productService : ProductService,
             ) { }

  ngOnInit(): void {
    
    
      this.productService.read().subscribe(products => {
        this.products = products;
        console.log(products)
      })
    
    
  }

}
