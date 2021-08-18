import { HeaderService } from './../components/template/header/header.service';
import { ObjetoToken } from './../models/Token/ObjetoToken';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { Component, Injectable } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoUsuario } from '../models/usuarios/enumUsuarios';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { isNullOrUndefined } from 'util';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private snackbar : MatSnackBar,
             private http : HttpClient,
             private headerService : HeaderService,
             private router : Router,
             public overlay : Overlay,
             public dialog : MatDialog

             ) { }


  showMessage(msg : string, isErro: boolean = false) : void { 
    this.snackbar.open(msg, 'X' , { 
      duration : 3000,
      horizontalPosition: "right",
      verticalPosition : "top",
      panelClass : isErro ? ['msg-error'] : ['msg-sucess']
    })

}

  erroHandler(e: any) : Observable<any>{
    this.showMessage("Erro ao Acessar a API!", true )
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
    
    let chaveEntrada = this.convertBase64toText("123");
    
    var dados =  {
        IdEmpresa : localStorage.getItem("empId"),
        GrupoUsuario : Number(localStorage.getItem("grpUs")),
        UsuarioId : Number(localStorage.getItem("usId")),
        StatusUsuario : localStorage.getItem("stUs"),
        TokenSessao : chaveEntrada 

    }
    return dados
  }


  atualizaRota() {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
  
    let currentUrl = this.router.url + '?';
  
    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  Popup(id : string, T : any, largura : string, altura: string ): void {
   
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const dialogRef = this.dialog.open(T, {
        width : largura,
        height : altura,
        scrollStrategy,
        id
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

  }

}