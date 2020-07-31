import { UtilService } from './util.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { Contato } from './../models/contato/modelContato';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  title = '';
  environmentName = '';
  environmentUrl = '';

  constructor(private snackbar : MatSnackBar,
    private http : HttpClient,
    private utilService : UtilService
    ) {
      this.environmentName = environment .environmentName;
      this.environmentUrl =  environment.apiUrl + '/contato';
      }

    //Criar um contato
    criar(contato : Contato): Observable<Contato>{
      return this.http.post<Contato>(this.environmentUrl, contato).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
    }
    
    // Buscar todos Get All
    buscarTodos(): Observable<Contato[]>{
      return this.http.get<Contato[]>(this.environmentUrl).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
    }

   //Buscar um contato por id
   buscarPorId(id: string): Observable<Contato>{
    const url = `${this.environmentUrl}/${id}`      
      return this.http.get<Contato>(url).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
   }

   // Atualizar contato por ID
   update(contato: Contato): Observable<Contato> {
    const url = `${this.environmentUrl}/${contato.id}`      
    return this.http.put<Contato>(url, contato).pipe(
      map(obj => obj),
      catchError(e => this.utilService.erroHandler(e))
    );
   }

   delete(id: number) : Observable<Contato>{
    const url = `${this.environmentUrl}/${id}`      
    return this.http.delete<Contato>(url).pipe(
      map(obj => obj),
      catchError(e => this.utilService.erroHandler(e))
    );

   }

}
