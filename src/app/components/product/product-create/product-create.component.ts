import { UtilService } from './../../../services/util.service';
import { ProductService } from './../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

    product : Product = {
    name : '',
    price : null
    
    }

  constructor(private ProductService : ProductService,
              private utilService : UtilService,
              private router : Router ) { }

  ngOnInit(): void {
    
  }

  createProduct() : void {

      this.ProductService.create(this.product).subscribe(() => {
      
        this.utilService.showMessage('Produto Criado!');
      
        this.router.navigate(['products']);
      
    })
    
  }

  cancel() : void {

    this.router.navigate(['products'])
  }

  
  

}
