import { environment } from '../../environments/environment';
import { Component } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  title = 'multiple-env-demo';
  environmentName = '';
  environmentUrl = 'Debug api';

  constructor(private snackbar : MatSnackBar,
              private http : HttpClient
              
             ) { 
              this.environmentName = environment.environmentName;
              this.environmentUrl =  environment.apiUrl + '/products';
             }

    showMessage(msg : string, isErro: boolean = false) : void { 
        this.snackbar.open(msg, 'X' , { 
          duration : 3000,
          horizontalPosition: "right",
          verticalPosition : "top",
          panelClass : isErro ? ['msg-error'] : ['msg-sucess']
        })

    }
    //Criar um produto
    create(product : Product): Observable<Product>{
      return this.http.post<Product>(this.environmentUrl, product).pipe(
        map(obj => obj),
        catchError(e => this.erroHandler(e))
      );
    }
    
    // Buscar todos Get All
    read(): Observable<Product[]>{
      return this.http.get<Product[]>(this.environmentUrl).pipe(
        map(obj => obj),
        catchError(e => this.erroHandler(e))
      );
    }

   //Buscar um produto por id
   readById(id: string): Observable<Product>{
    const url = `${this.environmentUrl}/${id}`      
      return this.http.get<Product>(url).pipe(
        map(obj => obj),
        catchError(e => this.erroHandler(e))
      );
   }

   // Atualizar Produto por ID
   update(product: Product): Observable<Product> {
    const url = `${this.environmentUrl}/${product.id}`      
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.erroHandler(e))
    );
   }

   delete(id: number) : Observable<Product>{
    const url = `${this.environmentUrl}/${id}`      
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.erroHandler(e))
    );

   }
    
   erroHandler(e: any) : Observable<any>{
    this.showMessage("Erro ao Acessar a API!", true )
    return EMPTY  
  }

}
