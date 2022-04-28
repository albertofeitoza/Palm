import { TipoUsuario } from './../../../models/usuarios/enumUsuarios';
import { UtilService } from './../../../services/util.service';
import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Component, OnInit } from '@angular/core';
import { cnpj } from 'cpf-cnpj-validator';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-empresa-update',
  templateUrl: './empresa-update.component.html',
  styleUrls: ['./empresa-update.component.css']
})
export class EmpresaUpdateComponent implements OnInit {

  empresa : Empresa;
  usuariologado : boolean;
  constructor(
              private empresaService : ServiceAllService<Empresa>,
              private utilservice : UtilService,
              public dialog : MatDialogRef<EmpresaUpdateComponent>
              ) { }

  ngOnInit(): void {
 
  if (Number(this.utilservice.Sessao().idGrupoUsuario) == TipoUsuario.Administrador)
     this.usuariologado = true;
  
  this.ObterEmpresa();
  
  }


  atualizarEmpresa() : void {
        
    if(Number(this.utilservice.Sessao().idGrupoUsuario) == TipoUsuario.Usuario)
    {
      this.utilservice.showMessage("Você não possui permissão para editar o cadastro de empresas", false)

    }else
    {
    
    if (cnpj.isValid(this.empresa.cnpj)){
      try {
                          
        this.empresa.bloqueado = Number(this.utilservice.Sessao().idGrupoUsuario) == TipoUsuario.Administrador ? this.empresa.bloqueado : false;             
        this.empresaService.update(this.empresa, Endpoint.Empresa).subscribe(()=>{
        this.utilservice.showMessage("Empresa atualizada com sucesso", false)
        
      });

      } catch (error) {
        this.utilservice.showMessage("Erro na atualização dos dados " + error, true);
      }

    }else{
      this.utilservice.showMessage("Cnpj Inválido " , false);
    }
   }
  }

  fecharPopup(){
    this.dialog.close();
  }

  
  ObterEmpresa() {
    this.empresaService.readById(this.dialog.id, Endpoint.Empresa).subscribe(emp => {
      this.empresa = emp;
    })    
       
  }
  

}


