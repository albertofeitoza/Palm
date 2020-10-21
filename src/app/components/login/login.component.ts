import { Acesso } from '../../models/acessoModel';
import { UtilService } from './../../services/util.service';
import { LoginService } from './../../services/login.service';

import { Usuario } from '../../models/modelLogin';
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
             private utilService : UtilService, 
            
             ) { }

  ngOnInit(): void {
  
  }
  
  logarSistema(){
      
          this.authservice.logarSistema(this.acesso);
          
      }    

}
