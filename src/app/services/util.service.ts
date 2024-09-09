import { DadosLogados } from './../models/usuarios/modelUsuarios';
import { HeaderService } from './../components/template/header/header.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, EMPTY, catchError, map } from 'rxjs';
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

  popupId: string = "";
  nomePopup: string = "";
  idsSelecionados: any = [];

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient,
    private headerService: HeaderService,
    private serviceLogin: LoginService,
    private router: Router,
    public overlay: Overlay,
    public dialog: MatDialog,
  ) { }

  showMessage(msg: string, isErro: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isErro ? ['msg-error'] : ['msg-sucess']
    })

  }

  erroHandler(e: any): Observable<any> {
    let mensagem = e.error;
    this.showMessage(e.error, true)
    return EMPTY
  }

  convertToBase64(txt: string): string {
    return btoa(txt);
  }

  convertBase64toText(txt: string): string {
    return atob(txt);

  }

  AtualizarMenu(titulo: string, icone: string, urlIcone: string) {
    this.headerService.headerData.title = titulo;
    this.headerService.headerData.icon = icone
    this.headerService.headerData.routeUrl = urlIcone

  }

  Sessao() {
    return this.serviceLogin.dadosUsuario
  }


  atualizaRota(rota: string, reload: boolean = false) {

    if (reload) {
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        this.router.navigate([rota]);
        reload = false;
      });
    }

  }

  Popup(id: any, componenteOrigem: any, largura: string, altura: string, disableclose: boolean = false) {

    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const dialogRef = this.dialog.open(componenteOrigem, {
      width: largura,
      height: altura,
      disableClose: disableclose,
      scrollStrategy,
      id
    });
    return dialogRef.afterClosed();
  }

  Genero() {
    let genero = []
    genero.push({ "id": 0, "tipo": "Selecione" })
    genero.push({ "id": 1, "tipo": "M" })
    genero.push({ "id": 2, "tipo": "F" })
    genero.push({ "id": 3, "tipo": "I" })
    return genero
  }

  EstCivil() {
    let estCivil = []
    estCivil.push({ "id": 0, "tipo": "Selecione" })
    estCivil.push({ "id": 1, "tipo": "Solteiro" })
    estCivil.push({ "id": 2, "tipo": "Casado" })
    estCivil.push({ "id": 3, "tipo": "Viúvo" })
    estCivil.push({ "id": 4, "tipo": "Separado" })

    return estCivil
  }

  TipoTelefone() {
    let tipoTel = []
    tipoTel.push({ "id": 0, "tipo": "Selecione" })
    tipoTel.push({ "id": 1, "tipo": "Residencial" })
    tipoTel.push({ "id": 2, "tipo": "Celular" })
    tipoTel.push({ "id": 3, "tipo": "Comercial" })

    return tipoTel;
  }

  Ddds() {
    let ddd = []
    ddd.push({ "id": 0, "tipo": "Selecione" })
    ddd.push({ "id": 11, "tipo": "São Paulo – SP" })
    ddd.push({ "id": 12, "tipo": "São José dos Campos – SP" })
    ddd.push({ "id": 13, "tipo": "Santos – SP" })
    ddd.push({ "id": 14, "tipo": "Bauru – SP" })
    ddd.push({ "id": 15, "tipo": "Sorocaba – SP" })
    ddd.push({ "id": 16, "tipo": "Ribeirão Preto – SP" })
    ddd.push({ "id": 17, "tipo": "São José do Rio Preto – SP" })
    ddd.push({ "id": 18, "tipo": "Presidente Prudente – SP" })
    ddd.push({ "id": 19, "tipo": "Campinas – SP" })
    ddd.push({ "id": 21, "tipo": "Rio de Janeiro – RJ" })
    ddd.push({ "id": 22, "tipo": "Campos dos Goytacazes – RJ" })
    ddd.push({ "id": 24, "tipo": "Volta Redonda – RJ" })
    ddd.push({ "id": 27, "tipo": "Vila Velha/Vitória – ES" })
    ddd.push({ "id": 28, "tipo": "Cachoeiro de Itapemirim – ES" })
    ddd.push({ "id": 31, "tipo": "Belo Horizonte – MG" })
    ddd.push({ "id": 32, "tipo": "Juiz de Fora – MG" })
    ddd.push({ "id": 33, "tipo": "Governador Valadares – MG" })
    ddd.push({ "id": 34, "tipo": "Uberlândia – MG" })
    ddd.push({ "id": 35, "tipo": "Poços de Caldas – MG" })
    ddd.push({ "id": 37, "tipo": "Divinópolis – MG" })
    ddd.push({ "id": 38, "tipo": "Montes Claros – MG" })
    ddd.push({ "id": 41, "tipo": "Curitiba – PR" })
    ddd.push({ "id": 42, "tipo": "Ponta Grossa – PR" })
    ddd.push({ "id": 43, "tipo": "Londrina – PR" })
    ddd.push({ "id": 44, "tipo": "Maringá – PR" })
    ddd.push({ "id": 45, "tipo": "Foz do Iguaçú – PR" })
    ddd.push({ "id": 46, "tipo": "Francisco Beltrão/Pato Branco – PR" })
    ddd.push({ "id": 47, "tipo": "Joinville – SC" })
    ddd.push({ "id": 48, "tipo": "Florianópolis – SC" })
    ddd.push({ "id": 49, "tipo": "Chapecó – SC" })
    ddd.push({ "id": 51, "tipo": "Porto Alegre – RS" })
    ddd.push({ "id": 53, "tipo": "Pelotas – RS" })
    ddd.push({ "id": 54, "tipo": "Caxias do Sul – RS" })
    ddd.push({ "id": 55, "tipo": "Santa Maria – RS" })
    ddd.push({ "id": 61, "tipo": "Brasília – DF" })
    ddd.push({ "id": 62, "tipo": "Goiânia – GO" })
    ddd.push({ "id": 63, "tipo": "Palmas – TO" })
    ddd.push({ "id": 64, "tipo": "Rio Verde – GO" })
    ddd.push({ "id": 65, "tipo": "Cuiabá – MT" })
    ddd.push({ "id": 66, "tipo": "Rondonópolis – MT" })
    ddd.push({ "id": 67, "tipo": "Campo Grande – MS" })
    ddd.push({ "id": 68, "tipo": "Rio Branco – AC" })
    ddd.push({ "id": 69, "tipo": "Porto Velho – RO" })
    ddd.push({ "id": 71, "tipo": "Salvador – BA" })
    ddd.push({ "id": 73, "tipo": "Ilhéus – BA" })
    ddd.push({ "id": 74, "tipo": "Juazeiro – BA" })
    ddd.push({ "id": 75, "tipo": "Feira de Santana – BA" })
    ddd.push({ "id": 77, "tipo": "Barreiras – BA" })
    ddd.push({ "id": 79, "tipo": "Aracaju – SE" })
    ddd.push({ "id": 81, "tipo": "Recife – PE" })
    ddd.push({ "id": 82, "tipo": "Maceió – AL" })
    ddd.push({ "id": 83, "tipo": "João Pessoa – PB" })
    ddd.push({ "id": 84, "tipo": "Natal – RN" })
    ddd.push({ "id": 85, "tipo": "Fortaleza – CE" })
    ddd.push({ "id": 86, "tipo": "Teresina – PI" })
    ddd.push({ "id": 87, "tipo": "Petrolina – PE" })
    ddd.push({ "id": 88, "tipo": "Juazeiro do Norte – CE" })
    ddd.push({ "id": 89, "tipo": "Picos – PI" })
    ddd.push({ "id": 91, "tipo": "Belém – PA" })
    ddd.push({ "id": 92, "tipo": "Manaus – AM" })
    ddd.push({ "id": 93, "tipo": "Santarém – PA" })
    ddd.push({ "id": 94, "tipo": "Marabá – PA" })
    ddd.push({ "id": 95, "tipo": "Boa Vista – RR" })
    ddd.push({ "id": 96, "tipo": "Macapá – AP" })
    ddd.push({ "id": 97, "tipo": "Coari – AM" })
    ddd.push({ "id": 98, "tipo": "São Luís – MA" })
    ddd.push({ "id": 99, "tipo": "Imperatriz – MA" })

    return ddd;

  }


  TipoPessoa() {
    let tipoPessoa = []
    tipoPessoa.push({ "id": 0, "tipo": "Selecione" })
    tipoPessoa.push({ "id": 1, "tipo": "Física" })
    tipoPessoa.push({ "id": 2, "tipo": "Jurídica" })
    return tipoPessoa
  }

  TipoUsuario() {
    let tipoUsuario = []
    tipoUsuario.push({ "id": 0, "tipo": "Selecione" })
    tipoUsuario.push({ "id": 1, "tipo": "Administrador" })
    tipoUsuario.push({ "id": 2, "tipo": "MasterEmpresa" })
    tipoUsuario.push({ "id": 3, "tipo": "Usuario" })
    return tipoUsuario
  }



  retornoDadosPopup() {
    let dados = [
      {
        "id": "",



      }

    ]

  }



}