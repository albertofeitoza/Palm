import { HeaderService } from './../components/template/header/header.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Component, EventEmitter, Injectable } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoUsuario } from '../models/usuarios/enumUsuarios';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar'


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private snackBar: MatSnackBar,
             private http : HttpClient,
             private headerService : HeaderService,
             private serviceLogin : LoginService,
             private router : Router,
             public overlay : Overlay,
             public dialog : MatDialog,
             ) { }
  showMessage(msg : string, isErro: boolean = false) : void { 
    this.snackBar.open(msg, 'X' , { 
      duration : 3000,
      horizontalPosition: "right",
      verticalPosition : "top",
      panelClass : isErro ? ['msg-error'] : ['msg-sucess']
    })

}

  erroHandler(e: any) : Observable<any>{
    let mensagem = e.error;
    this.showMessage(e.error, true )
    return EMPTY 
  }

  convertToBase64(txt : string){
    return btoa(txt);
  }

  convertBase64toText(txt: string){
    return atob(txt);

  }

  AtualizarMenu(titulo : string, icone : string, urlIcone : string ) {
      this.headerService.headerData.title = titulo ;
      this.headerService.headerData.icon = icone
      this.headerService.headerData.routeUrl = urlIcone
  
  }

  Sessao(){
    
    return this.serviceLogin.dadosLogado();

    /*
    var dadosSessao = {
        IdEmpresa : dados.empresaUsuarioId ,
        GrupoUsuario : dados.idGrupoUsuario,
        UsuarioId : dados.usuarioId,
        StatusUsuario : dados.bloqueado,
        accessToken : dados.accessToken

        dominio : dados.dominio,
        nomeUsuario : dados.nomeUsuario
        usuarioId : dados.usuarioId
        bloqueado : dados.bloqueado
        idGrupoUsuario : 
        empresaUsuarioId : number
        statusEmpresa : boolean
        erroLogin : boolean
        accessToken : string

    }
    return dadosSessao

    */
  }


   atualizaRota(rota : string, reload : boolean = false) {
      
    if (reload) {
        this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
          this.router.navigate([rota]);
          reload = false;
        });
      }
  
    }

  Popup(id : string, T : any, largura : string, altura: string ) {
   
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const dialogRef = this.dialog.open(T, {
        width : largura,
        height : altura,
        disableClose : true,
        scrollStrategy,
        id
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      
      });

  }

}