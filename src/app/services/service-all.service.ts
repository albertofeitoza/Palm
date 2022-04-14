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
              ) {
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

    // Buscar todos Get All
    read(tipo: string): Observable<T[]>{
      let idEmpresa = this.utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString() ? 0 : this.utilService.Sessao().empresaUsuarioId;
      return this.http.get<T[]>(`${this.environmentUrl + tipo}/?idEmpresa=${idEmpresa}` , this.loginservice.header()).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      ); 
    }

    //Buscar um cadastro por id
    readById(id: string, tipo: string): Observable<T>{
    const url = `${this.environmentUrl + tipo}/${id}`

      return this.http.get<T>(url, this.loginservice.header()).pipe(
        map(obj => obj),
        catchError(e => this.utilService.erroHandler(e))
      );
    }

    // Atualizar Produto 
    update(T: T, tipo: string): Observable<T> {    
    return this.http.put<T>(this.environmentUrl + tipo, T, this.loginservice.header()).pipe(
      map(obj => obj),
      catchError(e => this.utilService.erroHandler(e))
      );
    }

    delete (id: number, tipo : string)  : Observable<T> {
          const url = `${this.environmentUrl + tipo}/${id}`      
          return this.http.delete<T>(url, this.loginservice.header()).pipe(
          map(obj => obj),
          catchError(e => this.utilService.erroHandler(e))
          )
    }

}
