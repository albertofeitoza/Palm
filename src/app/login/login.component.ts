import { Router } from '@angular/router';
import { Usuario } from './modelLogin';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

public usuario: Usuario = new Usuario();

  constructor(private router :Router,
             private authservice : LoginService
             ) { }

  ngOnInit(): void {
  
  }

  logarSistema(){
    this.authservice.logarSistema(this.usuario);
  }

}
