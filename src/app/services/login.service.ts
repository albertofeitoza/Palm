import { TokenResponse } from './../models/Token/TokenResponse';
import { Usuario } from './../models/usuarios/modelLogin';
import { Login } from './../models/login';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Endpoint } from '../Negocio/Endpoint';
import { UtilService } from './util.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceAllService } from './service-all.service';
import { JwtDecodeOptions, JwtHeader, jwtDecode } from 'jwt-decode';
import { DadosLogados } from '../models/usuarios/modelUsuarios';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  title = '';
  environmentName = '';
  environmentUrl = '';

  mostrarMenuEmitter = new EventEmitter<boolean>();
  mostrarLoginEmitter = new EventEmitter<boolean>();
  token: any = new EventEmitter<string>();
  dadosUsuario: DadosLogados = new DadosLogados();

  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient,
  ) {
    this.environmentName = environment.environmentName;
    this.environmentUrl = environment.apiUrl;
  }


  //Novo Login

  loginSistema(sessao: Login) {
    this.sairSistema()

    this.http.post<any>(this.environmentUrl + Endpoint.Token, sessao,).pipe(
      map(obj => obj),
      catchError(e => this.erroHandler(this.showMessage("Api Indisponível", true)))
    ).subscribe(result => {
      if (result.code === 200) {
        this.token = result.data;
        this.mostrarMenuEmitter.emit(true);
        this.mostrarLoginEmitter.emit(false)
        this.getDecodedAccessToken(result.data)
        this.router.navigate(['/']);
        this.showMessage(result.mensagem, false)
      } else {
        this.showMessage(result.mensagem, true)
      }
    });
  }


  private getDecodedAccessToken(token: any): void {
    this.dadosUsuario.IdUsuario = Number(jwtDecode<TokenResponse>(token).unique_name[0]);
    this.dadosUsuario.NomeUsuarioLogado = jwtDecode<TokenResponse>(token).unique_name[1];
    this.dadosUsuario.TipoUsuarioLogado = Number(jwtDecode<TokenResponse>(token).unique_name[2]);
    this.dadosUsuario.EmpresaId = Number(jwtDecode<TokenResponse>(token).unique_name[3]);
    this.dadosUsuario.RazaoSocialEmpresa = jwtDecode<TokenResponse>(token).unique_name[4];
    this.dadosUsuario.EmpresaPai = Number(jwtDecode<TokenResponse>(token).unique_name[5]);
  }

  //Novo Login

  public sairSistema(): void {
    this.mostrarMenuEmitter.emit(false);
    this.mostrarLoginEmitter.emit(true)

    this.router.navigate(['/login']);
  }

  public header(): any {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
      // 'idusuario': `${this.dadosUsuario.IdUsuario}`,
      // //'IdEmpresa' : `${this.convertBase64toText(this.sessao.empresaUsuarioId)}`,

    });

    return { headers: headers };
  }


  convertToBase64(txt: string): string {
    return btoa(txt);
  }

  convertBase64toText(txt: string): string {
    return atob(txt);
  }








  // logarSistema(sessao: any) {
  //   this.sessao = new dadosSessao();
  //   this.sessao = sessao;

  //   if (this.isLogedIn()) {
  //     this.mostrarMenuEmitter.emit(true);
  //     this.mostrarLoginEmitter.emit(false)
  //     this.router.navigate(['/']);
  //   }
  //   else {
  //     this.convertBase64toText(this.sessao.erroLogin) == "True" ?
  //       this.showMessage("Usuário ou senha inválidos", true)
  //       : this.convertBase64toText(this.sessao.bloqueado) == "True" ? this.showMessage("Usuário bloqueado", true)
  //         : this.convertBase64toText(this.sessao.statusEmpresa) == "True" ? this.showMessage("Empresa bloqueada", true)
  //           : this.showMessage("Verificar os dados de acesso.", true)
  //   }
  // }

  // isLogedIn(): boolean {

  //   let erroLogin: Boolean = false;
  //   erroLogin = this.convertBase64toText(this.sessao.erroLogin) == "True" ? true
  //     : this.convertBase64toText(this.sessao.bloqueado) == "True" ? true
  //       : this.convertBase64toText(this.sessao.statusEmpresa) == "True" ? true
  //         : false
  //   return this.sessao != undefined && !erroLogin
  // }



  // dadosLogado() {
  //   let dados: any = new dadosSessao();
  //   dados.bloqueado = this.convertBase64toText(this.sessao.bloqueado) == "True" ? true : false;
  //   dados.dominio = this.convertBase64toText(this.sessao.dominio);
  //   dados.empresaUsuarioId = Number(this.convertBase64toText(this.sessao.empresaUsuarioId));
  //   dados.idGrupoUsuario = Number(this.convertBase64toText(this.sessao.idGrupoUsuario));
  //   dados.nomeUsuario = this.convertBase64toText(this.sessao.nomeUsuario);
  //   dados.usuarioId = Number(this.convertBase64toText(this.sessao.usuarioId));

  //   return dados;
  // }

  private erroHandler(e: any): Observable<any> {
    let mensagem = e.error;
    this.showMessage(e.error, true)
    return EMPTY
  }

  private showMessage(msg: string, isErro: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isErro ? ['msg-error'] : ['msg-sucess']
    })
  }

}





