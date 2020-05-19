import { Usuario } from './modelLogin';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { Injectable, EventEmitter  } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  UrlAcesso = "http://localhost:3001/usuarios"

  private usuarioAutenticado: boolean = false; 

  mostrarMenuEmitter = new EventEmitter<boolean>();
  mostrarLoginEmitter = new EventEmitter<boolean>();

  constructor(private router: Router,
              private snackbar : MatSnackBar
              ) { }


  logarSistema(usuario: Usuario){

    if(usuario.nome === 'alberto.feitoza@outlook.com' &&
      usuario.senha === '123456'){
        this.usuarioAutenticado = true;

        this.mostrarMenuEmitter.emit(true);
        this.mostrarLoginEmitter.emit(false)
        this.router.navigate(['/']);
        this.showMessage("Seja Bem Vindo!  " + usuario.nome , false);
      }else{
        this.usuarioAutenticado = false;
        this.mostrarMenuEmitter.emit(false);
        this.mostrarLoginEmitter.emit(true)
        this.showMessage("Usuário ou senha Inválido!", true);
    }
  
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





