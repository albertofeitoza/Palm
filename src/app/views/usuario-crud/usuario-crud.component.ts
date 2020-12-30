import { stringify } from 'querystring';
import { query } from '@angular/animations';
import { UsuarioReadComponent } from './../../components/usuario/usuario-read/usuario-read.component';
import { Empresa } from './../../models/empresa/ModelEmpresa';
import { Endpoint } from './../../Negocio/Endpoint';
import { UsuarioService } from './../../services/usuario.service';
import { ServiceAllService } from './../../services/service-all.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios/modelLogin';

@Component({
  selector: 'app-usuario-crud',
  templateUrl: './usuario-crud.component.html',
  styleUrls: ['./usuario-crud.component.css']
})
export class UsuarioCrudComponent implements OnInit {

  constructor(
              private router : Router) { }

  ngOnInit(): void {
  }

  
}
