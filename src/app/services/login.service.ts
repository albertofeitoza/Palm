import { Endpoint } from './../Negocio/Endpoint';
import { TipoUsuario, TipoUsuarioSistema } from './../models/usuarios/enumUsuarios';
import { ObjetoToken } from './../models/Token/ObjetoToken';
import { Empresa } from './../models/empresa/ModelEmpresa';
import { Acesso } from '../models/acessoModel';
import { Usuario } from '../models/usuarios/modelLogin';
import { UtilService } from './util.service';

import { environment } from './../../environments/environment';

import { map, catchError, take, retry } from 'rxjs/operators';
import { Observable, EMPTY, from, empty, pipe } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { Injectable, EventEmitter  } from '@angular/core';
import { stringify } from 'querystring';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

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
  objetoToken : ObjetoToken []

  private tipoUsuarios = [];

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
      let response = await this.http.post<ObjetoToken>(this.environmentUrl + Endpoint.Token, acesso).toPromise()
   
       if (response != null && !response.bloqueado && !response.statusEmpresa )
          {

            this.mostrarMenuEmitter.emit(true);
            this.mostrarLoginEmitter.emit(false)
            this.usuarioAutenticado = true;
            this.router.navigate(['/']);
                        
            localStorage.setItem("tId", response.token)
            localStorage.setItem("usId", response.id)
            localStorage.setItem("grpUs", response.grupoUsuarioId)
           
            localStorage.setItem("stUs", response.bloqueado);
            localStorage.setItem("empId", response.empresaId);
            this.utilService.showMessage("Seja Bem Vindo!  " + acesso.login , false);

          }
          else
          {
            this.usuarioAutenticado = false;
            this.mostrarMenuEmitter.emit(false);
            this.mostrarLoginEmitter.emit(true);
            
            if (response.bloqueado)
              this.utilService.showMessage("Usuário bloqueado!", true);
            else if (response.statusEmpresa)
              this.utilService.showMessage("Empresa bloqueada!", true);
            else 
              this.utilService.showMessage("Usuário ou senha Inválido!", true);
        }
      
      } catch (error) {
        this.utilService.showMessage("Erro de acesso a API", true);
      }
    
  }
  sairSistema(){
    this.mostrarMenuEmitter.emit(false);
    this.mostrarLoginEmitter.emit(true)
    localStorage.removeItem("tId");
    localStorage.removeItem("usId");
    localStorage.removeItem("grpUs");
    localStorage.removeItem("stUs");
    localStorage.removeItem("empId");
    this.utilService.showMessage("Até logo! ", false);
    this.router.navigate(['/login']);
  }

  header(){
    var reqHeader = new HttpHeaders({ 
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('tId')
    })
    return { headers: reqHeader };
  }

  TipoUsuarioSistema(){
    
    TipoUsuarioSistema.forEach(element => {
      this.tipoUsuarios.push(element)
    });
   return this.tipoUsuarios;
  }
  
}





