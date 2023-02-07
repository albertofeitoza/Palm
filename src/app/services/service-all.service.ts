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
export class ServiceAllService <T>{

  title = '';
  environmentName = '';
  environmentUrl = '';

  constructor(
              private http : HttpClient,
              private utilService: UtilService,
              private loginservice : LoginService
              ) 
              {
                this.environmentName = environment.environmentName;
                this.environmentUrl =  environment.BASE_URL;

                

              }


    //Criar Cadastro
    create(T : T, tipo: string) : Observable <T>{
      return this.http.post<T>(this.environmentUrl + tipo , T, this.loginservice.header()).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
    }

    read(componente: string): Observable<T[]>{
      //let idEmpresa = this.utilService.Sessao().idGrupoUsuario > 0 ? this.utilService.Sessao().idGrupoUsuario : this.utilService.Sessao().empresaUsuarioId;
      return this.http.get<T[]>(`${this.environmentUrl + componente}` , this.loginservice.header()).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      ); 
    }

    readById(id: string, componente: string): Observable<T>{
    const url = `${this.environmentUrl + componente}/${id}`

      return this.http.get<T>(url, this.loginservice.header()).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
    }
  
    update(T: T, componente: string): Observable<T> {    
    return this.http.put<T>(this.environmentUrl + componente, T, this.loginservice.header()).pipe(
      map(obj => obj),
      catchError(e => this.utilService.erroHandler(e))
      );
    }

    delete (id: number, componente : string)  : Observable<T> {
          const url = `${this.environmentUrl + componente}/${id}`      
          return this.http.delete<T>(url, this.loginservice.header()).pipe(
          map(obj => obj),
          catchError(e => this.utilService.erroHandler(e))
          )
    }

    // Buscar CEP na internet
    buscarExterna(url: string): Observable<T>{
      return this.http.get<T>(`${url}`).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      ); 
    }

    loginSistema(T : T, tipo: string) : Observable <T>{
      return this.http.post<T>(this.environmentUrl + tipo , T,).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
    }


}
