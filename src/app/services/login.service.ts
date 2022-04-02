import { TipoUsuarioSistema } from './../models/usuarios/enumUsuarios';
import { Acesso } from '../models/acessoModel';

import { environment } from './../../environments/environment';

import { Observable } from 'rxjs'
import { map, catchError, take } from 'rxjs/operators';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { Injectable, EventEmitter  } from '@angular/core';
import { dadosSessao } from '../models/Token/dadosSessao';
import { Endpoint } from '../Negocio/Endpoint';


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
  acesso : Acesso = new Acesso();

  private tipoUsuarios = [];

  private usuarioAutenticado: boolean = false; 

  mostrarMenuEmitter = new EventEmitter<boolean>();
  mostrarLoginEmitter = new EventEmitter<boolean>();
  
  sessao : dadosSessao
  erroLogin : string
  constructor(private router: Router,
              private http: HttpClient
              ) 
              { 
                this.environmentName = environment.environmentName;
                this.environmentUrl =  environment.BASE_URL;
              }
              
   logarSistema(domain : string, usuario : string , senha: string ) {

    var query = "?dominio=palm&login=palm&password=palmadmin2021"; 

    this.login(this.sessao, `${Endpoint.Token}${query}`).subscribe(logado => {
      this.sessao = logado;
    })


    this.mostrarMenuEmitter.emit(true);
    this.mostrarLoginEmitter.emit(false)


    //return this.http.post<dadosSessao>(this.environmentUrl + Endpoint.Token + query, {}).pipe(
    //  map(obj => (this.sessao = obj)),
    //  catchError(e => e.message)
    //  ); 
                                

                         //        create(T : T, tipo: string) : Observable <T>{
                         //         return this.http.post<T>(this.environmentUrl + tipo , T, this.loginservice.header()).pipe(
                         //           map(obj => obj),
                         //           catchError(e => this.utilService.erroHandler(e))
                         //         );
                         //       }
                            
    

    
    /*
     
      if (response != null && !response.bloqueado && !response.statusEmpresa && !response.erroLogin )
          {
            this.mostrarMenuEmitter.emit(true);
            this.mostrarLoginEmitter.emit(false)
            this.usuarioAutenticado = true;
            this.router.navigate(['/']);
            this.key = response.token;  
    
           // localStorage.setItem("tId", response.token )
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
      */
    
  }

 // login(endpoint: string, query : string) : Observable<dadosSessao>{
 //   return this.http.post<any>(this.environmentUrl + endpoint + query  , this.sessao)
 
   
//  }


login(T : dadosSessao, tipo: string) : Observable <dadosSessao>{
  return this.http.post<dadosSessao>(this.environmentUrl + tipo , T, {}).pipe(
    map(obj => obj)
  );
}




  sairSistema(){
    this.mostrarMenuEmitter.emit(false);
    this.mostrarLoginEmitter.emit(true)
    //localStorage.removeItem("tId");
    localStorage.removeItem("usId");
    localStorage.removeItem("grpUs");
    localStorage.removeItem("stUs");
    localStorage.removeItem("empId");
   // this.utilService.showMessage("Até logo! ", false);
    this.router.navigate(['/login']);
  }

  LimparCache(){

   // localStorage.removeItem("tId");
    localStorage.removeItem("usId");
    localStorage.removeItem("grpUs");
    localStorage.removeItem("stUs");
    localStorage.removeItem("empId");
  }

  header(){
       
  //  var key = localStorage.getItem('tId') != null ? localStorage.getItem('tId').substring(0, localStorage.getItem('tId').length -12)  : null
    var reqHeader = new HttpHeaders({ 
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': 'Bearer ' +  this.sessao.accessToken
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





