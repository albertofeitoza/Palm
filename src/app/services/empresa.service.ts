import { UtilService } from './util.service';
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
              private http : HttpClient,
              private utilService : UtilService
              ) 
              { 
                this.environmentName = environment.environmentName;
                this.environmentUrl =  environment.apiUrl + '/empresa';
              }
//Criar empresa
create(empresa : Empresa): Observable<Empresa>{
  return this.http.post<Empresa>(this.environmentUrl, empresa).pipe(
    map(obj => obj),
    catchError(e => this.utilService.erroHandler(e))
  );
}

 // Buscar todos Get All
 read(): Observable<Empresa[]>{
  return this.http.get<Empresa[]>(this.environmentUrl).pipe(
    map(obj => obj),
    catchError(e => this.utilService.erroHandler(e))
  );
}


//Buscar um produto por id
readById(id: string): Observable<Empresa>{
  const url = `${this.environmentUrl}/${id}`      
    return this.http.get<Empresa>(url).pipe(
      map(obj => obj),
      catchError(e => this.utilService.erroHandler(e))
    );
 }

 // Atualizar Produto por ID
 update(empresa: Empresa): Observable<Empresa> {
  const url = `${this.environmentUrl}/${empresa.id}`      
  return this.http.put<Empresa>(url, empresa).pipe(
    map(obj => obj),
    catchError(e => this.utilService.erroHandler(e))
  );
 }

 delete(id: number) : Observable<Empresa>{
  const url = `${this.environmentUrl}/${id}`      
  return this.http.delete<Empresa>(url).pipe(
    map(obj => obj),
    catchError(e => this.utilService.erroHandler(e))
  );

 }

}
