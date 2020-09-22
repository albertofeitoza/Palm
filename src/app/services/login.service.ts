import { Acesso } from './../models/loginModel';
import { Usuario } from './../models/modelLogin';
import { UtilService } from './util.service';

import { environment } from './../../environments/environment';

import { map, catchError, take, retry } from 'rxjs/operators';
import { Observable, EMPTY, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { Injectable, EventEmitter  } from '@angular/core';
import { stringify } from 'querystring';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  title = 'multiple-env-demo';
  environmentName = '';
  environmentUrl = 'Debug api';
  acesso : Acesso = new Acesso();
 
  private usuarioAutenticado: boolean = false; 

  mostrarMenuEmitter = new EventEmitter<boolean>();
  mostrarLoginEmitter = new EventEmitter<boolean>();

  constructor(private router: Router,
              private snackbar : MatSnackBar,
              private http: HttpClient,
              private utilService : UtilService,
               
              ) { 
                this.environmentName = environment.environmentName;
              this.environmentUrl =  environment.BASE_URL;
              }

  async logarSistema(acesso: Acesso) {
    
    try {
      var token = await this.http.post(this.environmentUrl + '/Token', acesso, httpOptions).toPromise()
      
      if(token != null)
          {
            this.usuarioAutenticado = true;
            this.mostrarMenuEmitter.emit(true);
            this.mostrarLoginEmitter.emit(false)
            this.router.navigate(['/']);
            this.utilService.showMessage("Seja Bem Vindo!  " + acesso.login , false);
          }else{
            this.usuarioAutenticado = false;
            this.mostrarMenuEmitter.emit(false);
            this.mostrarLoginEmitter.emit(true)
            this.utilService.showMessage("Usuário ou senha Inválido!", true);
        }
      
      } catch (error) {
        this.utilService.showMessage("Usuário ou senha Inválido!", true);
      }
    
  }

  sairSistema(){
    this.mostrarMenuEmitter.emit(false);
    this.mostrarLoginEmitter.emit(true)

    this.router.navigate(['/login']);
    this.utilService.showMessage("Até logo! ", false);
  }

  
}





