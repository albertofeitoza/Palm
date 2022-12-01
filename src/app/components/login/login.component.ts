import { Endpoint } from './../../Negocio/Endpoint';
import { Empresa } from './../../models/empresa/ModelEmpresa';
import { ServiceAllService } from './../../services/service-all.service';
import { UtilService } from './../../services/util.service';
import { LoginService } from './../../services/login.service';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios/modelLogin';
import { dadosSessao } from 'src/app/models/Token/dadosSessao';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

usuario: Usuario = new Usuario()
constructor(private router :Router,
             private authservice : LoginService,
             private servico : UtilService,
             private autenticacao : ServiceAllService<Usuario>
             ) {
              
             }


  ngOnInit(): void {
  
  }
  
  login(keyEvent : any){
    
    if (keyEvent.which === 13 || keyEvent.which == 1)
    {
      this.autenticacao.loginSistema(this.usuario, Endpoint.Token).subscribe(data => {
        this.authservice.logarSistema(data) 
      });
    }
  }
}
