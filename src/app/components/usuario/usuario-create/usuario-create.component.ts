import { Observable } from 'rxjs';
import { EmpresaService } from './../../../services/empresa.service';
import { Router } from '@angular/router';
import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from './../../../models/modelLogin';
import { Component, OnInit } from '@angular/core';
import { Empresa } from './../../../models/empresa/ModelEmpresa';



@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {
  
empresa : Observable<Empresa[]>;
dadosEmpresa : Empresa = new Empresa();
usuario : Usuario = new Usuario();

  constructor(private usuarioService : UsuarioService,
              private empresaService :EmpresaService,
              private router : Router) { }

  ngOnInit(): void {
  
    this.buscarEmpresa();
  }
  createUsuario() : void {
    this.usuario.empresaId = this.dadosEmpresa.id;
    this.usuarioService.create(this.usuario).subscribe(() => {
      this.usuarioService.showMessage('Usuário Criado!');
      this.router.navigate(['usuarios']);
    })

  }
  cancel() : void {

    this.router.navigate(['usuarios'])
  }

  buscarEmpresa() {
    this.empresa = this.empresaService.read();
  }
}
