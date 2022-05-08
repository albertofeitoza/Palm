import { TipoUsuario } from './../../../models/usuarios/enumUsuarios';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
opened = false;
lock = false;  
  constructor(private auth: LoginService,
             private servico : UtilService) { }

  ngOnInit(): void {
  this.validarAcesso();
  }

  sairSistema(){
    
    this.auth.sairSistema();
    
  }
  validarAcesso(){
    
    if(this.auth.isLogedIn())
      this.lock = this.servico.Sessao().idGrupoUsuario == TipoUsuario.Administrador ? true : false;
  }
}
