import { TipoUsuario } from 'src/app/models/usuarios/enumUsuarios';
import { UtilService } from './../../../services/util.service';
import { Endpoint } from './../../../Negocio/Endpoint';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { ServiceAllService } from './../../../services/service-all.service';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios/modelLogin';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-empresa-delete',
  templateUrl: './empresa-delete.component.html',
  styleUrls: ['./empresa-delete.component.css']
})
export class EmpresaDeleteComponent implements OnInit {


  empresa : Empresa
  constructor(private serviceEmpresa : ServiceAllService<Empresa>,
              private serviceUsuario : ServiceAllService<Usuario>,
              private mensagem : UtilService,
              public dialogRef : MatDialogRef<EmpresaDeleteComponent>,
              private utilservice : UtilService

            ) { }

  ngOnInit(): void {
    this.BuscarEmpresa();
  }


  excluirEmpresa(){
    
    let existeUsuario = null;
    
    this.serviceUsuario.read(Endpoint.Usuario).subscribe(usr => {
        usr = usr;
        
        if (usr.length > 0)
        {
          this.mensagem.showMessage("Empresa não pode ser excluida porque possui Dependências de usuários.", false)
        }    
        else
        {
            if (Number(this.utilservice.Sessao().GrupoUsuario) == TipoUsuario.Administrador){
              this.serviceEmpresa.delete(this.empresa.id, Endpoint.Empresa).subscribe(()=>{
                this.mensagem.showMessage("Empresa excluida com sucesso !", false);
               this.utilservice.atualizaRota("empresa")
              })
            }
              else{
                this.mensagem.showMessage("Permissão de exclusão negada !", false);
                this.utilservice.atualizaRota("empresa")
              }
        }
    });
  }

  fecharPopup(){
    this.dialogRef.close();
  }

   BuscarEmpresa(){
    
    
    this.serviceEmpresa.readById(this.dialogRef.id, Endpoint.Empresa).subscribe(emp => {
      this.empresa = emp;

    })

   }


}
