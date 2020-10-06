import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginService } from 'src/app/services/login.service';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceAllService <T>{

  title = '';
  environmentName = '';
  environmentUrl = '';

  constructor(
    private snackbar : MatSnackBar,
              private http : HttpClient,
              private utilService: UtilService,
              private loginservice : LoginService
              ) {
                this.environmentName = environment.environmentName;
                this.environmentUrl =  environment.BASE_URL;
              }


    //Criar Cadasto
    create(T : T) : Observable <T>{
      return this.http.post<T>(this.environmentUrl, T, this.loginservice.header()).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
    }

    // Buscar todos Get All
    read(): Observable<T[]>{
      return this.http.get<T[]>(this.environmentUrl, this.loginservice.header()).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      ); 
    }

    //Buscar um cadastro por id
    readById(id: string): Observable<T>{
    const url = `${this.environmentUrl}/${id}`

      return this.http.get<T>(url, this.loginservice.header()).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
    }

    // Atualizar Produto 
    update(T: T): Observable<T> {    
    return this.http.put<T>(this.environmentUrl, T, this.loginservice.header()).pipe(
      map(obj => obj),
      catchError(e => this.utilService.erroHandler(e))
      );
    }

    delete(T: T) : Observable<T>{
    const url = `${this.environmentUrl}/${T}`      
    return this.http.delete<T>(url, this.loginservice.header()).pipe(
      map(obj => obj),
      catchError(e => this.utilService.erroHandler(e))
      );

    }

}
