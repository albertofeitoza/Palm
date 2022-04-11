import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from './../../../models/usuarios/modelLogin';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {
@Input() empresa!: Empresa
@Input() usuario!: Usuario;



  constructor(private usuarioService : ServiceAllService<Usuario>,
              private empresaService : ServiceAllService<Empresa>,
              private utilService : UtilService,
              private route : ActivatedRoute,
              public dialogRef : MatDialogRef<UsuarioDeleteComponent>
             ) { }

  ngOnInit(): void {
    this.carregaUsuario()
  }

carregaUsuario(){

  
  this.usuarioService.readById(this.dialogRef.id, Endpoint.Usuario).subscribe(usuario => {
    this.usuario = usuario;
    
    this.buscarEmpresa().subscribe(empresa =>{
      this.empresa = empresa;
      this.usuario.empresaid = this.empresa.nomeFantasia;
     
    });
  })

}

  deleteUsuario(): void{
      this.usuarioService.delete(this.usuario.id , Endpoint.Usuario).subscribe(() => {
      this.utilService.showMessage("Usuário Excluído com Sucesso!")
      this.fecharPopup();
      this.utilService.atualizaRota("usuario", true);


    })
  }
  fecharPopup():void{
    this.dialogRef.close();
  }

  buscarEmpresa(){
    return this.empresaService.readById(this.usuario.empresaid, Endpoint.Empresa);
  }
}
