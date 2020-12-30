import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { EmpresaService } from './../../../services/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../../models/usuarios/modelLogin';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {
empresa : Empresa
usuario : Usuario;

  constructor(private usuarioService : ServiceAllService<Usuario>,
              private empresaService : ServiceAllService<Empresa>,
              private router : Router,
              private utilService : UtilService,
              private route : ActivatedRoute
             ) { }

  ngOnInit(): void {
    this.carregaUsuario()
  }

carregaUsuario(){

  const id = this.route.snapshot.paramMap.get('id')
  this.usuarioService.readById(id, Endpoint.Usuario).subscribe(usuario => {
    this.usuario = usuario;
    
    this.buscarEmpresa().subscribe(empresa =>{
      this.empresa = empresa;
      this.usuario.empresaId = this.empresa.nomeFantasia;
     
    });
  })

}

  deleteUsuario(): void{
      this.usuarioService.delete(this.usuario.id , Endpoint.Usuario).subscribe(() => {
      this.utilService.showMessage("Usuário Excluído com Sucesso!")
      this.router.navigate(['/usuarios'])
    })
  }
  cancel():void{
    this.router.navigate(['/usuarios'])
  }

  buscarEmpresa(){
    return this.empresaService.readById(this.usuario.empresaId, Endpoint.Empresa);
  }
}
