import { LoginService } from 'src/app/services/login.service';

import { UtilService } from './util.service';
import { environment } from '../../environments/environment';
import { Component } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/produtos/product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
              private loginservice : LoginService
              
             ) { 
              this.environmentName = environment.environmentName;
              this.environmentUrl =  environment.BASE_URL + '/Produto';
             }

    //Criar um produto
    create(product : Product): Observable<Product>{
      return this.http.post<Product>(this.environmentUrl, product, this.loginservice.header()).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
    }
    
    // Buscar todos Get All
    read(): Observable<Product[]>{
      return this.http.get<Product[]>(this.environmentUrl, this.loginservice.header()).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      ); 
    }

   //Buscar um produto por id
   readById(id: string): Observable<Product>{
    const url = `${this.environmentUrl}/${id}`

      return this.http.get<Product>(url, this.loginservice.header()).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
   }

   // Atualizar Produto 
   update(product: Product): Observable<Product> {    
    return this.http.put<Product>(this.environmentUrl, product, this.loginservice.header()).pipe(
      map(obj => obj),
      catchError(e => this.utilService.erroHandler(e))
    );
   }

   delete(id: number) : Observable<Product>{
    const url = `${this.environmentUrl}/${id}`      
    return this.http.delete<Product>(url, this.loginservice.header()).pipe(
      map(obj => obj),
      catchError(e => this.utilService.erroHandler(e))
    );

   }

}
