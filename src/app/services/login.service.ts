import { TipoUsuario, TipoUsuarioSistema } from './../models/usuarios/enumUsuarios';
import { environment } from './../../environments/environment';

import { Observable } from 'rxjs'
import { map, catchError, take } from 'rxjs/operators';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { Injectable, EventEmitter  } from '@angular/core';
import { dadosSessao } from '../models/Token/dadosSessao';
import { Endpoint } from '../Negocio/Endpoint';
import { UtilService } from './util.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  title = '';
  environmentName = '';
  environmentUrl = '';

  mostrarMenuEmitter = new EventEmitter<boolean>();
  mostrarLoginEmitter = new EventEmitter<boolean>();
  
  sessao: dadosSessao

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              ) {}
              
  logarSistema(sessao : any ) {
  this.sessao = new dadosSessao();
  this.sessao = sessao;

  if(this.isLogedIn())
      {
          this.mostrarMenuEmitter.emit(true);
          this.mostrarLoginEmitter.emit(false)
          this.router.navigate(['/']);
      }
        else{
          this.convertBase64toText(this.sessao.erroLogin) == "True" ?           
              this.showMessage("Usuário ou senha inválidos", true) 
              : this.convertBase64toText(this.sessao.bloqueado) == "True" ? this.showMessage("Usuário bloqueado", true) 
              : this.convertBase64toText(this.sessao.statusEmpresa) == "True" ? this.showMessage("Empresa bloqueada", true) 
              : this.showMessage("Verificar os dados de acesso.", true) 
        }
  }

isLogedIn () : boolean{

 let erroLogin : Boolean = false;
 erroLogin = this.convertBase64toText(this.sessao.erroLogin) == "True" ? true 
              : this.convertBase64toText(this.sessao.bloqueado) == "True" ? true
              : this.convertBase64toText(this.sessao.statusEmpresa) == "True" ? true
              : false
 return this.sessao != undefined && !erroLogin
}
  sairSistema(){
    this.mostrarMenuEmitter.emit(false);
    this.mostrarLoginEmitter.emit(true)
    
    this.sessao.accessToken = "";
    this.router.navigate(['/login']);
  }

  header(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.sessao.accessToken}`,
      'idusuario' : `${this.convertBase64toText(this.sessao.usuarioId)}`, 
      //'IdEmpresa' : `${this.convertBase64toText(this.sessao.empresaUsuarioId)}`,
      
    });

  return { headers: headers };
  }
  dadosLogado() {
    let dados : any = new dadosSessao();
        dados.bloqueado = this.convertBase64toText(this.sessao.bloqueado) == "True" ? true : false;
        dados.dominio = this.convertBase64toText(this.sessao.dominio);
        dados.empresaUsuarioId = Number(this.convertBase64toText(this.sessao.empresaUsuarioId));
        dados.idGrupoUsuario = Number(this.convertBase64toText(this.sessao.idGrupoUsuario));
        dados.nomeUsuario = this.convertBase64toText(this.sessao.nomeUsuario);
        dados.usuarioId = Number(this.convertBase64toText(this.sessao.usuarioId));
    
        return dados;
  }
  showMessage(msg : string, isErro: boolean = false) : void { 
    this.snackBar.open(msg, 'X' , { 
      duration : 3000,
      horizontalPosition: "right",
      verticalPosition : "top",
      panelClass : isErro ? ['msg-error'] : ['msg-sucess']
    })
  }

  convertToBase64(txt : string) : string {
    return btoa(txt);
  }

  convertBase64toText(txt: string) : string {
    return atob(txt);
  }
}





