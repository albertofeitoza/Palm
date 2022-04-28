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


  empresa : Empresa = new Empresa();
  dadosEmpresa : Empresa
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
   
    if (Number(this.utilservice.Sessao().idGrupoUsuario) == TipoUsuario.Administrador || 
        Number(this.utilservice.Sessao().idGrupoUsuario) == TipoUsuario.Master){
        
        this.serviceEmpresa.readById(this.empresa.id.toString(), Endpoint.Empresa).subscribe(x => {
        this.dadosEmpresa = x;
        
            this.dadosEmpresa.bloqueado = true;
              this.serviceEmpresa.update(this.dadosEmpresa, Endpoint.Empresa).subscribe(()=>{
                this.mensagem.showMessage("Empresa excluida com sucesso !", false);
               this.utilservice.atualizaRota("empresa")
              })
            
        })
    }else{
      this.mensagem.showMessage("Permissão de exclusão negada !", false);
                this.utilservice.atualizaRota("empresa")
    }
  }


  fecharPopup(){
    this.dialogRef.close();
  }

   BuscarEmpresa(){
   
    this.serviceEmpresa.readById(this.dialogRef.id, Endpoint.Empresa).subscribe(emp  => {
      this.empresa = emp;
    })
   }
}
