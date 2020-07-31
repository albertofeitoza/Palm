import { UtilService } from './util.service';

import { environment } from './../../environments/environment';
import { Usuario } from '../models/modelLogin';
import { map, catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { Injectable, EventEmitter  } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  title = 'multiple-env-demo';
  environmentName = '';
  environmentUrl = 'Debug api';
 
  private usuarioAutenticado: boolean = false; 

  mostrarMenuEmitter = new EventEmitter<boolean>();
  mostrarLoginEmitter = new EventEmitter<boolean>();

  constructor(private router: Router,
              private snackbar : MatSnackBar,
              private http: HttpClient,
              private utilService : UtilService,
               
              ) { 
                this.environmentName = environment.environmentName;
              this.environmentUrl =  environment.apiUrl + '/usuarios';
              }


  logarSistema(usuario: Usuario) {

    if(usuario.login === usuario.loginTemp &&
      usuario.senha === usuario.passwordTemp){
        this.usuarioAutenticado = true;

        this.mostrarMenuEmitter.emit(true);
        this.mostrarLoginEmitter.emit(false)
        this.router.navigate(['/']);
        this.utilService.showMessage("Seja Bem Vindo!  " + usuario.login , false);
      }else{
        this.usuarioAutenticado = false;
        this.mostrarMenuEmitter.emit(false);
        this.mostrarLoginEmitter.emit(true)
        this.utilService.showMessage("Usuário ou senha Inválido!", true);
    }
  }

 
  readByIdSenha(login: string, senha: string): Observable<Usuario>{
    const url = `${this.environmentUrl}/${login}/${senha}`      
      return this.http.get<Usuario>(url).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
   }
 
 
  buscarUsuario(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.environmentUrl).pipe(
      map(obj => obj),
      catchError(e => this.utilService.erroHandler(e))
    );
    
  }

  sairSistema(){
    this.mostrarMenuEmitter.emit(false);
    this.mostrarLoginEmitter.emit(true)

    this.router.navigate(['/login']);
    this.utilService.showMessage("Até logo! ", false);
  }

  
}





