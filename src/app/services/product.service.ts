import { UtilService } from './util.service';
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

  title = '';
  environmentName = '';
  environmentUrl = '';

  constructor(private snackbar : MatSnackBar,
              private http : HttpClient,
              private utilService: UtilService,
              
             ) { 
              this.environmentName = environment.environmentName;
              this.environmentUrl =  environment.apiUrl + '/products';
             }

    //Criar um produto
    create(product : Product): Observable<Product>{
      return this.http.post<Product>(this.environmentUrl, product).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
    }
    
    // Buscar todos Get All
    read(): Observable<Product[]>{
      return this.http.get<Product[]>(this.environmentUrl).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
    }

   //Buscar um produto por id
   readById(id: string): Observable<Product>{
    const url = `${this.environmentUrl}/${id}`      
      return this.http.get<Product>(url).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
   }

   // Atualizar Produto por ID
   update(product: Product): Observable<Product> {
    const url = `${this.environmentUrl}/${product.id}`      
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.utilService.erroHandler(e))
    );
   }

   delete(id: number) : Observable<Product>{
    const url = `${this.environmentUrl}/${id}`      
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.utilService.erroHandler(e))
    );

   }

}
