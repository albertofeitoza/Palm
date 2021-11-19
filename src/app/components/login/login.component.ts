import { Endpoint } from './../../Negocio/Endpoint';
import { Empresa } from './../../models/empresa/ModelEmpresa';
import { ServiceAllService } from './../../services/service-all.service';
import { Acesso } from '../../models/acessoModel';
import { UtilService } from './../../services/util.service';
import { LoginService } from './../../services/login.service';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ObjetoToken } from 'src/app/models/Token/ObjetoToken';
import { Usuario } from 'src/app/models/usuarios/modelLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

acesso : Acesso = new Acesso();
usuario : Usuario = new Usuario();


constructor(private router :Router,
             private authservice : LoginService,
             private serviceLogin : ServiceAllService<Usuario>
             ) { }

  ngOnInit(): void {
  
  }
  
  logarSistema(keyEvent : any){

    if (keyEvent.which === 13 || keyEvent.which == 1)
    {
      this.authservice.sairSistema();
      this.serviceLogin.create(this.usuario, Endpoint.Token).subscribe(response => {
        let resposta = response;
        this.authservice.logarSistema(resposta);
        resposta = null;
      });
    }
  }
}
