import { TipoUsuario } from './../../../models/usuarios/enumUsuarios';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
opened = false;
lock = false;  
  constructor(private auth: LoginService) { }

  ngOnInit(): void {
  this.validarAcesso();
  }

  sairSistema(){
    
    this.auth.sairSistema();
    
  }
validarAcesso(){
  this.lock = Number(localStorage.getItem("grpUs")) == TipoUsuario.Administrador ? true : false;
}
 

}
