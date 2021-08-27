import { TipoUsuario } from './../../../models/usuarios/enumUsuarios';
import { Usuario } from './../../../models/usuarios/modelLogin';
import { UtilService } from './../../../services/util.service';
import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Component, OnInit } from '@angular/core';
import { cnpj } from 'cpf-cnpj-validator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
 
  if (Number(this.utilservice.Sessao().GrupoUsuario) == TipoUsuario.Administrador)
     this.usuariologado = true;
  
  this.ObterEmpresa();
  
  }


  atualizarEmpresa() : void {
    
    let grpId = Number(this.utilservice.Sessao().GrupoUsuario);
    if(grpId == TipoUsuario.Usuario)
    {
      this.utilservice.showMessage("Você não possui permissão para editar o cadastro de empresas", false)

    }else
    {
     if (cnpj.isValid(this.empresa.cnpj)){
               try {
                        this.empresaService.update(this.empresa, Endpoint.Empresa).subscribe(()=>{
                        this.utilservice.showMessage("Empresa atualizada com sucesso", false)
                        this.utilservice.atualizaRota("empresa");
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


