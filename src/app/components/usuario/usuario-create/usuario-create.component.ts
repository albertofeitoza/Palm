import { Usuario } from 'src/app/models/usuarios/modelLogin';
import { Endpoint } from './../../../Negocio/Endpoint';
import { GrupoUsuario } from './../../../models/usuarios/GrupoUsuarios';
import { LoginService } from 'src/app/services/login.service';
import { ServiceAllService } from './../../../services/service-all.service';
import { TipoUsuario, TipoUsuarioSistema } from './../../../models/usuarios/enumUsuarios';
import { UtilService } from './../../../services/util.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  tipoLogin: boolean = false;
  empresa: Empresa[];
  tipoUsuario: any[]

  dadosEmpresa: Empresa;
  usuario: Usuario = new Usuario();


  constructor(private serviceUsuario: ServiceAllService<any>,
    private utilService: UtilService,
    private serviceLogin: LoginService,
    public dialogRef: MatDialogRef<UsuarioCreateComponent>,

    private router: Router) { }

  ngOnInit(): void {

    this.carregaCombos();
    this.carregaEmpresa();
  }

  public fecharPopup(salvar : boolean): void {
    
    if(salvar){
      this.usuario.empresaId = Number(this.dialogRef.id);
      this.usuario.pessoaId = 0
      this.usuario.ativo = true;
      this.dialogRef.close(this.usuario);
    } else {
      this.dialogRef.close();
    }
    
  }

  private carregaCombos(): void {
    if(this.serviceLogin.dadosUsuario.TipoUsuarioLogado == TipoUsuario.Administrador){
      this.tipoUsuario = this.utilService.TipoUsuario();
    }

    if(this.serviceLogin.dadosUsuario.TipoUsuarioLogado == TipoUsuario.MasterEmpresa){
      this.tipoUsuario = this.utilService.TipoUsuario().filter(x => x.id > 1);
    }

  }

  carregaEmpresa(): void {

  }
}
