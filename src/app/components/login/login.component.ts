import { Endpoint } from './../../Negocio/Endpoint';
import { Empresa } from './../../models/empresa/ModelEmpresa';
import { ServiceAllService } from './../../services/service-all.service';
import { Acesso } from '../../models/acessoModel';
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
             private servico : UtilService
             ) {
              
             }


  ngOnInit(): void {
  
  }
  
  login(keyEvent : any){
    
    if (keyEvent.which === 13 || keyEvent.which == 1)
    {
     this.authservice.logarSistema(this.usuario.nome, this.usuario.login, this.usuario.senha) 
    }
  }
  
}
