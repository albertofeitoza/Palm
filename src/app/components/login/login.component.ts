import { Endpoint } from './../../Negocio/Endpoint';
import { Empresa } from './../../models/empresa/ModelEmpresa';
import { ServiceAllService } from './../../services/service-all.service';
import { Acesso } from '../../models/acessoModel';
import { UtilService } from './../../services/util.service';
import { LoginService } from './../../services/login.service';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

acesso : Acesso = new Acesso();



constructor(private router :Router,
             private authservice : LoginService,
             ) { }

  ngOnInit(): void {
  
  }
  
  logarSistema(keyEvent : any){

    if (keyEvent.which === 13 || keyEvent.which == 1)
      this.authservice.logarSistema(this.acesso);

  }
  
}
