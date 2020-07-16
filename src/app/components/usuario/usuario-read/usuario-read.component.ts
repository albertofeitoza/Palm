import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { EmpresaService } from './../../../services/empresa.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from '../../../models/modelLogin';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})
export class UsuarioReadComponent implements OnInit {

  usuario: Usuario[]
  empresa: Empresa
  displayedColumns = ['id','nome','email','telefone','login', 'senha', 'empresaId','action']  

  constructor(private usuarioService: UsuarioService,
              private empresaService: EmpresaService
             ) 
             { }

  ngOnInit(): void {
    this.usuarioService.read().subscribe(usuario => {
      this.usuario = usuario;

      usuario.forEach(element => {
        
        this.empresaService.readById(element.empresaId).subscribe(empresa => {
          this.empresa = empresa;
          element.empresaId  = this.empresa.razaoSocial;

        });
        

      });



      console.log(usuario);
    })
      
  }

}
