import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private snackbar : MatSnackBar) { }


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
}