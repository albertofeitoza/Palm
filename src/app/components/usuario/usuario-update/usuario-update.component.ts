import { TipoUsuario, TipoUsuarioSistema } from './../../../models/usuarios/enumUsuarios';
import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { Observable } from 'rxjs';
import { EmpresaService } from './../../../services/empresa.service';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from '../../../models/usuarios/modelLogin';
import { Component, OnInit } from '@angular/core';
import { query } from '@angular/animations';


@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

  empresa : Observable<Empresa[]>;
  dadosEmpresa : Empresa;
  usuario : Usuario ;
  userAutenticado : boolean = false; 
  
  comboTipousuario = [];


  constructor(private usarioService : ServiceAllService<Usuario>,
             private empresaService : ServiceAllService<Empresa>,
             private utilService: UtilService,
             private router : Router,
             private route: ActivatedRoute
             ) { }

  ngOnInit(): void {
    this.buscarUsuario();
    this.buscarEmpresa();
  }

  updateUsuario() : void {
    
    this.usuario.grupoUsuarioId = this.usuario.grupoUsuarioId == "Administrador" ? TipoUsuario.Administrador.toString() 
                                   :this.usuario.grupoUsuarioId == "Sistema" ? TipoUsuario.Sistema.toString()
                                   : this.usuario.grupoUsuarioId == "Usuario" ? TipoUsuario.Usuario.toString()
                                   : this.usuario.grupoUsuarioId == "Master" ? TipoUsuario.Master.toString()
                                   : null 

    this.usarioService.update(this.usuario, Endpoint.Usuario).subscribe(() => {
      this.utilService.showMessage("Usuário Atualizado com Sucesso!")
      this.router.navigate(['/usuarios'])
    })
  }

  cancel(): void{
    this.router.navigate(['/usuarios'])
  }

  buscarEmpresa() {
    this.empresa = this.empresaService.read(Endpoint.Empresa);
  }

  buscarUsuario(){
    const id = this.route.snapshot.paramMap.get('id')
    this.usarioService.readById(id, Endpoint.Usuario).subscribe(usuario => {
      this.usuario = usuario;
      let tipousuario = usuario.grupoUsuarioId;
      this.usuario.grupoUsuarioId = this.usuario.grupoUsuarioId == TipoUsuario.Administrador.toString() ? "Administrador"
                                   :this.usuario.grupoUsuarioId == TipoUsuario.Sistema.toString()  ? "Sistema"
                                   : this.usuario.grupoUsuarioId == TipoUsuario.Usuario.toString()  ? "Usuario" 
                                   : this.usuario.grupoUsuarioId == TipoUsuario.Master.toString()  ? "Master" 
                                   : null 
                                         
      this.carregarComboTipoUsuario(this.usuario.grupoUsuarioId, tipousuario); 
      
                   
    });
    
  }

  carregarComboTipoUsuario(usuario : string, tipousuario : string) : void  {
 
    if (tipousuario == TipoUsuario.Usuario.toString()) 
    {
      this.comboTipousuario.push(this.usuario.grupoUsuarioId.toString())
    }
    else
    {
      for (var tipo in TipoUsuario) {
      
        if (TipoUsuario.hasOwnProperty(tipo) &&
          (isNaN(parseInt(tipo)))) {
          this.comboTipousuario.push(tipo)
        }
      
      }
    }
          
  }

}
