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

tipoLogin : boolean = false;
empresa: Empresa[];

dadosEmpresa : Empresa;
usuario : Usuario = new Usuario();

grupousuario: GrupoUsuario[];

criargrupousuario: GrupoUsuario



constructor(  private serviceUsuario : ServiceAllService<Usuario>,
              private serviceEmpresa : ServiceAllService<Empresa>,
              private serviceGrupoUsuario : ServiceAllService<GrupoUsuario>,
              private utilService : UtilService,
              private serviceLogin : LoginService,
              public dialogRef: MatDialogRef <UsuarioCreateComponent>, 
              
              private router : Router) { }

  ngOnInit(): void {
      // let grpId = Number(this.utilService.Sessao().idGrupoUsuario);
      
      // if (grpId == TipoUsuario.Administrador)
      //    this.tipoLogin=true;

      this.carregaCombos();
      this.carregaEmpresa();
  }
  
  createUsuario() : void {
   
  //  this.usuario.criadoPor  = Number(this.utilService.Sessao().usuarioId);
   this.usuario.dtCriacao = new Date;
   
    this.usuario.grupoUsuarioid = this.usuario.grupoUsuarioid.toString().trim() == "Administrador" ? TipoUsuario.Administrador.toString() 
                                : this.usuario.grupoUsuarioid.toString().trim() == "MasterEmpresa" ? TipoUsuario.MasterEmpresa.toString()
                                : this.usuario.grupoUsuarioid.toString() == "Usuario" ? TipoUsuario.Usuario.toString() : "Usuario";
    
    

    this.serviceUsuario.read(Endpoint.Usuarios).subscribe(user => {
      user = user;

      let ativo = user.filter(x => x.login.toLowerCase() == this.usuario.login.toLowerCase());
           
            if (ativo.length > 0)
            {
              this.utilService.showMessage('Esse Usuário já existe para essa Empresa');
              user =  new Array();
            }else{
           
              this.serviceEmpresa.readById(this.usuario.empresaid, Endpoint.Empresa).subscribe(emp => {
                emp = emp;
                if (!emp.status){
                  this.serviceUsuario.create(this.usuario, Endpoint.Usuarios).subscribe(() => {
                    this.utilService.showMessage('Usuário Criado!');
                  });
                }
                else
                {
                  this.utilService.showMessage(`Não pode ser criado Usuário para empresa ${emp.razaoSocial} porque essa empresa está bloqueada.`, false);
                }
              });
              
              user =  new Array();
            }

    })
  }

  fecharPopup(): void{
    this.dialogRef.close();
  }

  carregaCombos() : void  {

    this.serviceGrupoUsuario.read(Endpoint.GrupoUsuario).subscribe(u => {
      this.grupousuario = u;
  
    });

 }

  carregaEmpresa() : void {
    this.serviceEmpresa.read(Endpoint.Empresa).subscribe(emp => {
      this.empresa = emp
    })
  }
}
