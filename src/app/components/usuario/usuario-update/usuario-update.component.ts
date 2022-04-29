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
   
        let grpId = Number(localStorage.getItem("grpUs"));
        this.usuario.grupoUsuarioid = this.usuario.grupoUsuarioid == "Administrador" ? TipoUsuario.Administrador.toString() 
                                        :this.usuario.grupoUsuarioid == "Sistema" ? TipoUsuario.Sistema.toString()
                                        : this.usuario.grupoUsuarioid == "Usuario" ? TipoUsuario.Usuario.toString()
                                        : this.usuario.grupoUsuarioid == "Master" ? TipoUsuario.Master.toString()
                                        : "Usuario" 
          
            this.usarioService.read(Endpoint.Usuario).subscribe(user => {
              user = user;
                                    
              let ativo = user.filter(x => x.login.toLowerCase() == this.usuario.login.toLowerCase() && x.empresaid == this.usuario.empresaid && x.id == this.usuario.id);
          
                if (ativo.length > 0 )
                {
                    this.usarioService.update(this.usuario, Endpoint.Usuario).subscribe(() => {
                      this.utilService.showMessage("Usuário Atualizado com Sucesso!")
                      this.fecharPopup();
                      this.utilService.atualizaRota("usuario");
                    })
                    user =  new Array();
                  }else if(grpId == TipoUsuario.Administrador){
                      
                    this.usarioService.update(this.usuario, Endpoint.Usuario).subscribe(() => {
                        this.utilService.showMessage("Usuário Atualizado com Sucesso!")
                        this.fecharPopup();
                        this.utilService.atualizaRota("usuario", true);
                        
                      })
                      user =  new Array();
                  }else{

                    this.utilService.showMessage('A empresa do Usuário não pode ser Alterada', false);

                    user =  new Array();
                }
            })

  }

  

  buscarEmpresa() {
    
    let empId = this.utilService.Sessao().empresaUsuarioId
    let grpId = this.utilService.Sessao().grupoUsuarioid

    this.empresaService.read(Endpoint.Empresa).subscribe(emp => {
      this.empresa = this.utilService.Sessao().grupoUsuarioid == TipoUsuario.Administrador 
                      ? emp 
                      : this.utilService.Sessao().grupoUsuarioid == TipoUsuario.Master 
                      ? emp.filter(x => x.empresaPai == this.utilService.Sessao().empresaUsuarioId || x.id == this.utilService.Sessao().empresaUsuarioId) : new Array

    
    });
  }

  buscarUsuario(){

      this.usarioService.readById(this.dialogRef.id, Endpoint.Usuario).subscribe(usr => {
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
