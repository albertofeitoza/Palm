import { HeaderService } from './../components/template/header/header.service';
import { ObjetoToken } from './../models/Token/ObjetoToken';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private snackbar : MatSnackBar,
             private http : HttpClient,
             private headerService : HeaderService
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
    let chave = this.convertBase64toText("Palm");
    var dados =  {
        IdEmpresa : localStorage.getItem("empId"),
        GrupoUsuario : Number(localStorage.getItem("grpUs")),
        UsuarioId : Number(localStorage.getItem("usId")),
        StatusUsuario : localStorage.getItem("stUs"),
        TokenSessao : chave +  localStorage.getItem("tId")

    }
    
    return dados
  }

}