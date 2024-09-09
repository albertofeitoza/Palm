import { TipoUsuario, TipoUsuarioSistema } from './../../../models/usuarios/enumUsuarios';
import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../models/usuarios/modelLogin';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';
import { GrupoUsuario } from 'src/app/models/usuarios/GrupoUsuarios';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

empresa : Empresa[] ;
dadosEmpresa : Empresa;
usuario : Usuario = new Usuario()
  
comboTipousuario : GrupoUsuario[];

  constructor(private usarioService : ServiceAllService<Usuario>,
             private empresaService : ServiceAllService<Empresa>,
             private utilService: UtilService,
             private router : Router,
             public dialogRef : MatDialogRef<UsuarioUpdateComponent>,
             private grupoUsuario : ServiceAllService<GrupoUsuario>,
             ) { }

  ngOnInit(): void {
    this.buscarUsuario();
    this.buscarEmpresa();

  }

 
  updateUsuario() : void {
   
        // let grpId = Number(localStorage.getItem("grpUs"));
        // this.usuario.grupoUsuarioid = this.usuario.grupoUsuarioid == "Administrador" ? TipoUsuario.Administrador.toString() 
        //                                 : this.usuario.grupoUsuarioid == "Usuario" ? TipoUsuario.Usuario.toString()
        //                                 : this.usuario.grupoUsuarioid == "Master" ? TipoUsuario.MasterEmpresa.toString()
        //                                 : "Usuario" 
          
        //     this.usarioService.read(Endpoint.Usuarios).subscribe(user => {
        //       user = user;
                                    
        //       let ativo = user.filter(x => x.login.toLowerCase() == this.usuario.login.toLowerCase() && x.empresaid == this.usuario.empresaid && x.id == this.usuario.id);
          
        //         if (ativo.length > 0 )
        //         {
        //             this.usarioService.update(this.usuario, Endpoint.Usuarios).subscribe(() => {
        //               this.utilService.showMessage("Usuário Atualizado com Sucesso!")

        //             })
        //             user =  new Array();

        //           }else if(grpId == TipoUsuario.Administrador){
                      
        //             this.usarioService.update(this.usuario, Endpoint.Usuarios).subscribe(() => {
        //                 this.utilService.showMessage("Usuário Atualizado com Sucesso!")
                        
        //               })
        //               user =  new Array();
        //           }else{

        //             this.utilService.showMessage('A empresa do Usuário não pode ser Alterada', false);

        //             user =  new Array();
        //         }
        //     })
  }

  

  buscarEmpresa() {

    // this.empresaService.read(Endpoint.Empresa).subscribe(emp => {
    //   this.empresa = this.utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString() 
    //                   ? emp 
    //                   : this.utilService.Sessao().idGrupoUsuario == TipoUsuario.MasterEmpresa.toString()
    //                   ? emp.filter(x => x.empresaPai == Number(this.utilService.Sessao().empresaUsuarioId) || x.id == Number(this.utilService.Sessao().empresaUsuarioId)) : new Array

    
    // });
  }

  buscarUsuario(){

      this.usarioService.readById(this.dialogRef.id, Endpoint.Usuarios).subscribe(usr => {
      this.usuario = usr;
   
      this.carregarComboTipoUsuario(); 

    });
  }



  carregarComboTipoUsuario() : void  {
    
        this.grupoUsuario.read(Endpoint.GrupoUsuario).subscribe(grp => {
          this.comboTipousuario = grp;
        
        
        })

  
  }
 

  fecharPopup(): void{
    this.dialogRef.close();


  }

}
