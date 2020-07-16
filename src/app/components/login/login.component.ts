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

public usuario: Usuario = new Usuario();

usuariosSistema: Usuario[]

constructor(private router :Router,
             private authservice : LoginService
            
             ) { }

  ngOnInit(): void {
  
  }
  
  logarSistema(){
    
    
   
    
    this.authservice.buscarUsuario().subscribe(usuariosSistema => {
      this.usuariosSistema = usuariosSistema;


      for (let index = 0; index < usuariosSistema.length; index++) {
               
        const element = usuariosSistema[index];

        if(element.login === this.usuario.login  && element.senha == this.usuario.senha)
        {
          this.usuario.loginTemp = element.login;
          this.usuario.passwordTemp = element.senha

          this.usuario.loginTemp =  (this.usuario.loginTemp);
          this.authservice.logarSistema(this.usuario);
          this.usuario === null;
          break;
          
        }
        else{
          this.authservice.showMessage("Usuário ou senha Inválido!", true);
        }

      }    

  });

  }

}
