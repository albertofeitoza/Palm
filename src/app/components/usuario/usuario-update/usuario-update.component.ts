import { TipoUsuario, TipoUsuarioSistema } from './../../../models/usuarios/enumUsuarios';
import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../models/usuarios/modelLogin';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

empresa : Empresa[] ;
dadosEmpresa : Empresa;
usuario : Usuario = new Usuario()
  
comboTipousuario = [];

  constructor(private usarioService : ServiceAllService<Usuario>,
             private empresaService : ServiceAllService<Empresa>,
             private utilService: UtilService,
             private router : Router,
             public dialogRef : MatDialogRef<UsuarioUpdateComponent>,
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
    
    let empId = localStorage.getItem("empId");
    let grpId = Number(localStorage.getItem("grpUs"));

    this.empresaService.read(Endpoint.Empresa).subscribe(emp => {
      emp = emp;


       grpId==TipoUsuario.Administrador ? emp  : 
                      grpId == TipoUsuario.Master && emp.filter(x => x.id == Number(empId))
                      || grpId == TipoUsuario.Usuario && emp.filter(x => x.id == Number(empId))
                      || emp.filter(x => x.empresaPai == Number(empId));
    
    });
  }

  buscarUsuario(){

      this.usarioService.readById(this.dialogRef.id, Endpoint.Usuario).subscribe(usuario => {
      this.usuario = usuario;

      let tipousuario = usuario.grupoUsuarioid;
      
      tipousuario ="Administrador";
      this.usuario.grupoUsuarioid = this.usuario.grupoUsuarioid == TipoUsuario.Administrador.toString() ? "Administrador"
                                   :this.usuario.grupoUsuarioid == TipoUsuario.Sistema.toString()  ? "Sistema"
                                   : this.usuario.grupoUsuarioid == TipoUsuario.Usuario.toString()  ? "Usuario" 
                                   : this.usuario.grupoUsuarioid == TipoUsuario.Master.toString()  ? "Master" 
                                   : "Usuario" 
     
     this.carregarComboTipoUsuario(this.usuario.grupoUsuarioid, tipousuario); 
    });
  }



  carregarComboTipoUsuario(usuario : string, tipousuario : string) : void  {
    let grpId = Number(localStorage.getItem("grpUs"));

    
      for (var tipo in TipoUsuario) {
      
           if (TipoUsuario.hasOwnProperty(tipo) &&
            (isNaN(parseInt(tipo))) && grpId == TipoUsuario.Administrador ) {
    
              //this.comboTipousuario.push(tipo)
              
            }
            else if (TipoUsuario.hasOwnProperty(tipo) &&
            (isNaN(parseInt(tipo))) && grpId == TipoUsuario.Master ){
    
            //if(TipoUsuarioSistema.get(tipo) == TipoUsuario.Master || TipoUsuarioSistema.get(tipo) == TipoUsuario.Usuario)            
               // this.comboTipousuario.push(tipo);
          
            }
            else if (TipoUsuario.hasOwnProperty(tipo) &&
            (isNaN(parseInt(tipo))) && grpId == TipoUsuario.Usuario ){
      
              //if(TipoUsuarioSistema.get(tipo) == TipoUsuario.Usuario)            
                 // this.comboTipousuario.push(tipo);
            }
            
          
          
      }
  }
 

  fecharPopup(): void{
    this.dialogRef.close();
  }

}
