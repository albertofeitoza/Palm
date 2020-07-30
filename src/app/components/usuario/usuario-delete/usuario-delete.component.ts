import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { EmpresaService } from './../../../services/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/modelLogin';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {
empresa : Empresa
usuario : Usuario;

  constructor(private usuarioService : UsuarioService,
              private empresaService : EmpresaService,
              private router : Router,
              private route : ActivatedRoute
             ) { }

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id')
    this.usuarioService.readById(id).subscribe(usuario => {
      this.usuario = usuario;
      
      this.buscarEmpresa().subscribe(empresa =>{
        this.empresa = empresa;
        this.usuario.empresaId = this.empresa.nomeFantasia;
        this.usuario.senha = '******';
      });
    })
  }

  deleteUsuario(): void{
    this.usuarioService.delete(this.usuario.id).subscribe(() => {
      this.usuarioService.showMessage("Usuário Excluído com Sucesso!")
      this.router.navigate(['/usuarios'])
    })
  }
  cancel():void{
    this.router.navigate(['/usuarios'])
  }

  buscarEmpresa(){
    return this.empresaService.readById(this.usuario.empresaId);
  }
}
