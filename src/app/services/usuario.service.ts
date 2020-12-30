import { UtilService } from './util.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { Usuario } from '../models/usuarios/modelLogin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  title = 'multiple-env-demo';
  environmentName = '';
  environmentUrl = 'Debug api';

  constructor(
              private snackbar : MatSnackBar,
              private http: HttpClient,
              private utilService : UtilService
             ) {
              this.environmentName = environment.environmentName;
              this.environmentUrl =  environment.apiUrl + '/usuarios';
              }

      // Buscar todos Get All
      read(): Observable<Usuario[]>{
        return this.http.get<Usuario[]>(this.environmentUrl).pipe(
          map(obj => obj),
          catchError(e => this.utilService.erroHandler(e))

        );
      }

      // Criar usuario
      create(usuario : Usuario) : Observable<Usuario>{
        return this.http.post<Usuario>(this.environmentUrl, usuario).pipe(
          map(obj => obj),
          catchError(e => this.utilService.erroHandler(e))
        )};

      // Atualizar usuario por ID
      update(usuario: Usuario): Observable<Usuario> {
        const url = `${this.environmentUrl}/${usuario.id}`      
        return this.http.put<Usuario>(url, usuario).pipe(
          map(obj => obj),
          catchError(e => this.utilService.erroHandler(e))
        );
      }
     
      //Buscar um usuario por id
      readById(id: string): Observable<Usuario>{
        const url = `${this.environmentUrl}/${id}`      
          return this.http.get<Usuario>(url).pipe(
            map(obj => obj),
            catchError(e => this.utilService.erroHandler(e))
          );
       }

      //Delete por ID
       delete(id: string) : Observable<Usuario>{
        const url = `${this.environmentUrl}/${id}`      
        return this.http.delete<Usuario>(url).pipe(
          map(obj => obj),
          catchError(e => this.utilService.erroHandler(e))
        );
       }

       

}
