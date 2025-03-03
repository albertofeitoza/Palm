import { error } from 'console';
import { map, catchError, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginService } from 'src/app/services/login.service';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoUsuario, TipoUsuarioSistema } from '../models/usuarios/enumUsuarios';


@Injectable({
  providedIn: 'root'
})
export class ServiceAllService<T> {

  title = '';
  environmentName = '';
  environmentUrl = '';

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private loginservice: LoginService
  ) {
    this.environmentName = environment.environmentName;
    this.environmentUrl = environment.apiUrl;
  }


  //Criar Cadastro
  create(T: T, endpoint: string, filtros: any = null): Observable<T> {
    return this.http.post<T>(this.environmentUrl + endpoint, T, this.loginservice.header(filtros))
      .pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
  }

  read(endpoint: string, filtros: any = null): Observable<T[]> {
    return this.http.get<T[]>(`${this.environmentUrl + endpoint}`, this.loginservice.header(filtros))
      .pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
  }

  readById(id: string, endpoint: string, filtros: any = null): Observable<T> {
    let url = `${this.environmentUrl + endpoint}/${id}`

    return this.http.get<T>(url, this.loginservice.header(filtros))
      .pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
  }

  update(T: T, endpoint: string, filtros: any = null): Observable<T> {
    return this.http.put<T>(this.environmentUrl + endpoint, T, this.loginservice.header(filtros))
      .pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
  }

  delete(id: number, endpoint: string, filtros: any = null): Observable<T> {
    const url = `${this.environmentUrl + endpoint}/${id}`
    return this.http.delete<T>(url, this.loginservice.header(filtros))
      .pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      )
  }

  // Buscar CEP na internet
  buscarExterna(url: string, filtros: any = null): Observable<T> {
    return this.http.get<T>(`${url}`)
      .pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
  }
}
