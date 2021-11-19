import { GrupoUsuario } from './../models/usuarios/GrupoUsuarios';
import { ServiceAllService } from './service-all.service';
import { Endpoint } from './../Negocio/Endpoint';
import { TipoUsuario, TipoUsuarioSistema } from './../models/usuarios/enumUsuarios';
import { ObjetoToken } from './../models/Token/ObjetoToken';
import { Empresa } from './../models/empresa/ModelEmpresa';
import { Acesso } from '../models/acessoModel';
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
import { STRING_TYPE } from '@angular/compiler';
import { Usuario } from '../models/usuarios/modelLogin';

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
              ) { }

  logarSistema(response: any) {
    
    try {
      if (response != null && !response.bloqueado && !response.statusEmpresa && !response.erroLogin )
          {
            this.mostrarMenuEmitter.emit(true);
            this.mostrarLoginEmitter.emit(false)
            this.usuarioAutenticado = true;
            this.router.navigate(['/']);

            localStorage.setItem("tId", response.token )
            localStorage.setItem("usId", response.id)
            localStorage.setItem("grpUs", response.grupoUsuarioid)
           
            localStorage.setItem("stUs", response.bloqueado);
            localStorage.setItem("empId", response.empresaid);
            this.utilService.showMessage("Seja Bem Vindo!  " , false);

            response.gruposUsuarios.forEach(element => {

              if (element.nome == "Administrador")
                  localStorage.setItem("grpUsGrpAdm", element.id.toString())
              else if (element.nome == "Sistema")
                  localStorage.setItem("grpUsGrpsis", element.id.toString())
              else if (element.nome == "Usuario")
                  localStorage.setItem("grpUsGrpUs", element.id.toString())
              else if (element.nome == "Master")
                  localStorage.setItem("grpUsGrpMs", element.id.toString())
            });
            
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
      
      } catch (e) {
     
          this.utilService.showMessage("Erro de acesso a API" + e.message, true);
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

  LimparCache(){

    localStorage.removeItem("tId");
    localStorage.removeItem("usId");
    localStorage.removeItem("grpUs");
    localStorage.removeItem("stUs");
    localStorage.removeItem("empId");
  }

  header(){
       
    var key = localStorage.getItem('tId') != null ? localStorage.getItem('tId').substring(0, localStorage.getItem('tId').length -12)  : null
    var reqHeader = new HttpHeaders({ 
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': 'Bearer ' + key
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





