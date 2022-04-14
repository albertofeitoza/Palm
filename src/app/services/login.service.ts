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


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};



@Injectable({
  providedIn: 'root'
})

export class LoginService {

  title = '';
  environmentName = '';
  environmentUrl = '';
 // acesso : Acesso = new Acesso();

  private tipoUsuarios: TipoUsuario[];

  mostrarMenuEmitter = new EventEmitter<boolean>();
  mostrarLoginEmitter = new EventEmitter<boolean>();
  
  sessao: dadosSessao

  constructor(private router: Router,
              private http: HttpClient,
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
        }
    });
  }
    
login(T : dadosSessao, tipo: string) : Observable <dadosSessao>{
  return this.http.post<dadosSessao>(this.environmentUrl + tipo , T, {}).pipe(
    map(obj => obj)
  );
}


isLogedIn () : boolean{
  return this.sessao != undefined && !this.sessao.erroLogin 
}



  sairSistema(){
    this.mostrarMenuEmitter.emit(false);
    this.mostrarLoginEmitter.emit(true)
    
    this.sessao.accessToken = "";
    this.router.navigate(['/login']);
  }

  header(){

    var reqHeader = new HttpHeaders({ 
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': 'Bearer ' +  this.sessao.accessToken != null ? this.sessao.accessToken.substring(0, this.sessao.accessToken.length -12)  : ""
    })
    
    return { headers: reqHeader };
  }

  TipoUsuarioSistema(){
    
    TipoUsuarioSistema.forEach(element => {
      this.tipoUsuarios.push(element)
    });
   return this.tipoUsuarios;
  }

  dadosLogado() {
      return this.sessao;
  }
  
}





