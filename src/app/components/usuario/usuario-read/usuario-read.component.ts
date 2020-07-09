import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from './../../../models/modelLogin';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})
export class UsuarioReadComponent implements OnInit {

  usuario: Usuario[]
  displayedColumns = ['id','nome','email','telefone','login', 'senha', 'dominio','action']  

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
   
    this.usuarioService.read().subscribe(usuario => {
      this.usuario = usuario;
      console.log(usuario);
    })
      
  }

}
