import { Empresa } from './../models/empresa/ModelEmpresa';
import { environment } from './../../environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  title = '';
  environmentName = '';
  environmentUrl = '';

  constructor(private snackbar : MatSnackBar,
              private http : HttpClient
              ) 
              { 
                this.environmentName = environment.environmentName;
                this.environmentUrl =  environment.apiUrl + '/empresa';
              }


   showMessage(msg : string, isErro: boolean = false) : void { 
    this.snackbar.open(msg, 'X' , { 
      duration : 3000,
      horizontalPosition: "right",
      verticalPosition : "top",
      panelClass : isErro ? ['msg-error'] : ['msg-sucess']
    })
}

//Criar empresa
create(empresa : Empresa): Observable<Empresa>{
  return this.http.post<Empresa>(this.environmentUrl, empresa).pipe(
    map(obj => obj),
    catchError(e => this.erroHandler(e))
  );
}

 // Buscar todos Get All
 read(): Observable<Empresa[]>{
  return this.http.get<Empresa[]>(this.environmentUrl).pipe(
    map(obj => obj),
    catchError(e => this.erroHandler(e))
  );
}


//Buscar um produto por id
readById(id: string): Observable<Empresa>{
  const url = `${this.environmentUrl}/${id}`      
    return this.http.get<Empresa>(url).pipe(
      map(obj => obj),
      catchError(e => this.erroHandler(e))
    );
 }

 // Atualizar Produto por ID
 update(empresa: Empresa): Observable<Empresa> {
  const url = `${this.environmentUrl}/${empresa.id}`      
  return this.http.put<Empresa>(url, empresa).pipe(
    map(obj => obj),
    catchError(e => this.erroHandler(e))
  );
 }

 delete(id: number) : Observable<Empresa>{
  const url = `${this.environmentUrl}/${id}`      
  return this.http.delete<Empresa>(url).pipe(
    map(obj => obj),
    catchError(e => this.erroHandler(e))
  );

 }


erroHandler(e: any) : Observable<any>{
  this.showMessage("Erro ao Acessar a API!", true )
  return EMPTY  
}


}
