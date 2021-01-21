import { stringify } from 'querystring';
import { UsuarioReadComponent } from './../usuario-read/usuario-read.component';
import { Endpoint } from './../../../Negocio/Endpoint';
import { GrupoUsuario } from './../../../models/usuarios/GrupoUsuarios';
import { LoginService } from 'src/app/services/login.service';
import { ServiceAllService } from './../../../services/service-all.service';
import { TipoUsuario, TipoUsuarioSistema } from './../../../models/usuarios/enumUsuarios';
import { UtilService } from './../../../services/util.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/usuarios/modelLogin';
import { Component, OnInit } from '@angular/core';
import { Empresa } from './../../../models/empresa/ModelEmpresa';




@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {
  
//empresa : Observable<Empresa[]>;
empresa : Empresa[];

dadosEmpresa : Empresa;
usuario : Usuario = new Usuario();

grupousuario : GrupoUsuario[];

criargrupousuario : GrupoUsuario = new GrupoUsuario()

comboTipousuario = [];

constructor(  private serviceUsuario : ServiceAllService<Usuario>,
              private serviceEmpresa : ServiceAllService<Empresa>,
              private serviceGrupoUsuario : ServiceAllService<GrupoUsuario>,
              private utilService : UtilService,
              private serviceLogin : LoginService,
              
              private router : Router) { }

  ngOnInit(): void {
      let grpId = Number(localStorage.getItem("grpUs"));
      this.alimentarCombo();
      this.buscarEmpresa();
  }
  
  createUsuario() : void {
    
    this.usuario.criadoPor  = Number(localStorage.getItem("usId"));
    this.usuario.dtCriacao = new Date;
    //this.usuario.empresaId = localStorage.getItem("empId")
   
    this.usuario.grupoUsuarioId = this.usuario.grupoUsuarioId.toString().trim() == "Administrador" ? TipoUsuario.Administrador.toString() 
                                : this.usuario.grupoUsuarioId.toString().trim() == "Sistema" ? TipoUsuario.Sistema.toString()
                                : this.usuario.grupoUsuarioId.toString().trim() == "Master" ? TipoUsuario.Master.toString()
                                : this.usuario.grupoUsuarioId.toString() == "Usuario" ? TipoUsuario.Usuario.toString() : null;
    
    this.serviceUsuario.read(Endpoint.Usuario).subscribe(user => {
      user = user;

      let ativo = user.filter(x => x.login.toLowerCase() == this.usuario.login.toLowerCase() && x.empresaId == this.usuario.empresaId);
           
            if (ativo.length > 0)
            {
              this.utilService.showMessage('Esse Usuário já existe para essa Empresa');
              this.usuario.login =  null; 
              user =  new Array();
            }else{

              this.serviceUsuario.create(this.usuario, Endpoint.Usuario).subscribe(() => {
                this.utilService.showMessage('Usuário Criado!');
                this.router.navigate(['usuarios']);
              })

              user =  new Array();
            }

    })
  }

  cancel(): void{
    this.router.navigate(['/usuarios'])
  }

  buscarEmpresa() {
   
    let empId = localStorage.getItem("empId");
    let grpId = Number(localStorage.getItem("grpUs"));

    this.serviceEmpresa.read(Endpoint.Empresa).subscribe(emp => {
        emp = emp; 

        this.empresa =  new Array()

          emp.forEach(empresasCarregadas => {
        
            if(grpId == TipoUsuario.Administrador)
              this.empresa.push(empresasCarregadas)
            else if (grpId == TipoUsuario.Master && empId == empresasCarregadas.empresaPai.toString() || grpId == TipoUsuario.Usuario && empId == empresasCarregadas.empresaPai.toString() )
                this.empresa.push(empresasCarregadas)
            });
    })
  }

  alimentarCombo() : void  {

    let grpId = Number(localStorage.getItem("grpUs"));

    for (var tipo in TipoUsuario) {
      if (TipoUsuario.hasOwnProperty(tipo) &&
        (isNaN(parseInt(tipo))) && grpId == TipoUsuario.Administrador ) {

          this.comboTipousuario.push(tipo)
          
      }
      else if (TipoUsuario.hasOwnProperty(tipo) &&
      (isNaN(parseInt(tipo))) && grpId == TipoUsuario.Master ){

        if(TipoUsuarioSistema.get(tipo) == TipoUsuario.Master || TipoUsuarioSistema.get(tipo) == TipoUsuario.Usuario)            
            this.comboTipousuario.push(tipo);
      
        }

    }
  }

  createGrupoUsuario(){


    this.criargrupousuario.criadoPor  = Number(localStorage.getItem("usId"));
    this.criargrupousuario.dtCriacao = new Date;
    this.criargrupousuario.empresaId = Number(localStorage.getItem("empId"));

      this.serviceGrupoUsuario.create(this.criargrupousuario, Endpoint.GrupoUsuario).subscribe(() => {
        this.utilService.showMessage('Grupo de Usuário Criado!');

      })
    
      
  }

}
