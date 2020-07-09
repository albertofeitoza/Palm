import { catchError, map } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { Usuario } from './../models/modelLogin';
import { HttpClient } from '@angular/common/http';
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
             // private router: Route,
              private snackbar : MatSnackBar,
              private http: HttpClient
             ) {
              this.environmentName = environment.environmentName;
              this.environmentUrl =  environment.apiUrl + '/usuarios';
              }



      // Buscar todos Get All
      read(): Observable<Usuario[]>{
        return this.http.get<Usuario[]>(this.environmentUrl).pipe(
          map(obj => obj),
          catchError(e => this.erroHandler(e))
        );
      }

      erroHandler(e: any) : Observable<any>{
        this.showMessage("Erro ao Acessar a API!", true )
        return EMPTY
      }


      showMessage(msg : string, isErro: boolean = false) : void { 
        this.snackbar.open(msg, 'X' , { 
          duration : 3000,
          horizontalPosition: "right",
          verticalPosition : "top",
          panelClass : isErro ? ['msg-error'] : ['msg-sucess']
        })

      }
}
