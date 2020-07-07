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

  UrlUsuario = "http://localhost:3001/usuarios"
  
  private usuarioAutenticado: boolean = false; 

  mostrarMenuEmitter = new EventEmitter<boolean>();
  mostrarLoginEmitter = new EventEmitter<boolean>();

  constructor(private router: Router,
              private snackbar : MatSnackBar,
              private http: HttpClient
              ) { }


  logarSistema(usuario: Usuario) {


    if(usuario.login === usuario.loginTemp &&
      usuario.senha === usuario.passwordTemp){
        this.usuarioAutenticado = true;

        this.mostrarMenuEmitter.emit(true);
        this.mostrarLoginEmitter.emit(false)
        this.router.navigate(['/']);
        this.showMessage("Seja Bem Vindo!  " + usuario.login , false);
      }else{
        this.usuarioAutenticado = false;
        this.mostrarMenuEmitter.emit(false);
        this.mostrarLoginEmitter.emit(true)
        this.showMessage("Usuário ou senha Inválido!", true);
    }
  }

  buscarUsuario(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.UrlUsuario).pipe(
      map(obj => obj),
      catchError(e => this.erroHandler(e))
    );
    
  }

  erroHandler(e: any) : Observable<any>{
    this.showMessage("Erro ao Acessar a API!", true )
    return EMPTY
  }


  sairSistema(){
    this.mostrarMenuEmitter.emit(false);
    this.mostrarLoginEmitter.emit(true)

    this.router.navigate(['/login']);
    this.showMessage("Até logo! ", false);
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





