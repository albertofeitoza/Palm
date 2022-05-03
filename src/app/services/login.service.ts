import { TipoUsuario, TipoUsuarioSistema } from './../models/usuarios/enumUsuarios';
import { Acesso } from '../models/acessoModel';

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
  
  sessao: any

  constructor(private router: Router,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              ) 
              { 
                this.environmentName = environment.environmentName;
                this.environmentUrl =  environment.BASE_URL;
                
              }
              
  logarSistema(domain : string, usuario : string , senha: string ) {

  this.sessao = new dadosSessao();
    
  this.login(this.sessao, `${Endpoint.Token}?dominio=${domain}&login=${usuario}&password=${senha}`).subscribe(log => {
  this.sessao = log;

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
    });
  }
    
 login(T : dadosSessao, tipo: string) : Observable <dadosSessao>{
  return this.http.post<dadosSessao>(this.environmentUrl + tipo , T, {}).pipe(
    map(obj => obj)
  );
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
      'Authorization': `Bearer ${this.sessao.accessToken}`
    });

  return { headers: headers };
  }

  dadosLogado() {
      return this.sessao;
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





